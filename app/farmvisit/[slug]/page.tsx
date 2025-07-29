"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { farmVisits, FarmVisit } from "@/app/assets/farmvisit/farmvisitassets";
import placeholder from "@/public/avatar.png";

export default function VisitDetails() {
  const params = useParams();
  const slug = params?.slug;
  const visit = farmVisits.find((item: FarmVisit) => item.slug === slug);
  const [current, setCurrent] = useState(0);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }

      setCurrent(0);
    };

    // Set initial value
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!visit) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Visit not found</h2>
        </div>
      </section>
    );
  }

  const totalImages = visit.images.length;
  const maxSteps = Math.max(0, totalImages - visibleCount);
  const showNavigation = totalImages > visibleCount;

  const handleNext = () => setCurrent((prev) => Math.min(prev + 1, maxSteps));
  const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));

  // Get current visible images
  const visibleImages = visit.images.slice(current, current + visibleCount);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>{visit.title}</h1>
        <div className={styles.meta}>
          <span className={styles.badge}>{visit.category}</span>
          <p className={styles.metaText}>
            {visit.area} | {visit.date} at {visit.time}
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.imageCarousel}>
            {visibleImages.map((src, idx) => (
              <div key={current + idx} className={styles.carouselImageWrapper}>
                <Image
                  src={src}
                  alt={`${visit.title} image ${current + idx + 1}`}
                  width={350}
                  height={250}
                  className={styles.carouselImage}
                  onClick={() => setModalIdx(current + idx)}
                />
              </div>
            ))}
          </div>

          {showNavigation && (
            <div className={styles.carouselNav}>
              <button
                className={styles.navButton}
                onClick={handlePrev}
                disabled={current === 0}
                aria-label="Previous images"
              >
                ← Previous
              </button>
              <span className={styles.navText}>
                {current + 1}-{Math.min(current + visibleCount, totalImages)} of{" "}
                {totalImages}
              </span>
              <button
                className={styles.navButton}
                onClick={handleNext}
                disabled={current >= maxSteps}
                aria-label="Next images"
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {modalIdx !== null && (
          <div
            className={styles.modalOverlay}
            onClick={() => setModalIdx(null)}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={visit.images[modalIdx]}
                alt={`Full size image ${modalIdx + 1}`}
                width={800}
                height={600}
                className={styles.modalImage}
              />
              <button
                className={styles.closeBtn}
                onClick={() => setModalIdx(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className={styles.description}>
          <h2 className={styles.sectionHeading}>About the Visit</h2>

          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: visit.description }}
          ></div>
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.sectionHeading}>Visit Summary</h2>
          <div className={styles.cardWrapper}>
            {/* Trainer Card */}

            <div className={`${styles.card} ${styles.trainerCard}`}>
              <div className={styles.trainerHeader}>
                <Image
                  src={placeholder}
                  alt={visit.trainer}
                  width={60}
                  height={60}
                  className={styles.avatar}
                />
                <div className={styles.guestInfo}>
                  <p className={styles.guestText}>
                    {visit.guests} guests
                    <span className={styles.categoryBadge}>
                      {visit.category}
                    </span>
                  </p>
                </div>
              </div>

              <div className={styles.trainerDetails}>
                <h3 className={styles.cardTitle}>Trainer</h3>
                <p className={styles.cardSubtitle}>{visit.trainer}</p>
                <p className={styles.cardText}>Farm Specialist</p>
              </div>
            </div>

            {/* Highlights Card */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Highlights</h3>
              <ul className={styles.highlightList}>
                {visit.highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Summary Card */}
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Training Summary</h3>
              <p className={styles.cardText}>{visit.treatmentSummary}</p>
            </div>
          </div>
        </div>

        <div className={styles.contactInfo}>
          <h2 className={styles.sectionHeading}>Contact Info</h2>
          <p>
            📧 <strong>Email:</strong> {visit.contactInfo.email}
            <br />
            📞 <strong>Phone:</strong> {visit.contactInfo.phone}
          </p>
        </div>

        {visit.feedback.length > 0 && (
          <div className={styles.feedbackSection}>
            <h2 className={styles.sectionHeading}>Visitor Feedback</h2>
            <ul className={styles.feedbackList}>
              {visit.feedback.map((fb, idx) => (
                <li key={idx} className={styles.feedbackItem}>
                  <p>
                    <strong>{fb.name}:</strong> {fb.comment}
                  </p>
                  <p>⭐ {fb.rating}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
