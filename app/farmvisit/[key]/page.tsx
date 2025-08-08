"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import placeholder from "@/public/avatar.png";
import { FarmVisits } from "@/lib/TSInterfaces/typescriptinterface";
import axios from "axios";

export default function VisitDetails() {
  const { key } = useParams();
  const [visit, setVisit] = useState<FarmVisits | null>(null);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchVisit = async () => {
      try {
        const res = await axios.get(`/api/farmvisits/${key}`);

        setVisit(res.data);
      } catch (err) {
        console.error("Failed to fetch visit", err);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      fetchVisit();
    }
  }, [key]);

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionHeading}>Loading...</h2>
        </div>
      </section>
    );
  }

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
  const visibleImages = visit.images.slice(current, current + visibleCount);

  const handleNext = () => setCurrent((prev) => Math.min(prev + 1, maxSteps));
  const handlePrev = () => setCurrent((prev) => Math.max(prev - 1, 0));

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
                  src={src.url}
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
                src={visit.images[modalIdx].url}
                alt={`Full size image ${modalIdx + 1}`}
                width={800}
                height={600}
                className={styles.modalImage}
              />
              <button
                className={styles.closeBtn}
                onClick={() => setModalIdx(null)}
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
          />
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
            📧 <strong>Email:</strong> {visit.email}
            <br />
            📞 <strong>Phone:</strong> {visit.phone}
          </p>
          <br />
          <div className={styles.daysContainer}>
            <h3 className={styles.daysHeading}>
              Days Available For Farm Visit
            </h3>
            <div className={styles.badgesWrapper}>
              {visit.availableDays.map((day, index) => (
                <span key={index} className={styles.dayBadge}>
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
