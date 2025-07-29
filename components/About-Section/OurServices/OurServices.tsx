"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

import guidedTour from "@/app/assets/services/guided-tour.jpg";
import communityMarket from "@/app/assets/services/marketing.jpg";
import workshops from "@/app/assets/services/workshops.jpg";
import livestock from "@/app/assets/services/livestock.jpg";
import ecoAgri from "@/app/assets/services/ecoagri.jpg";
import offer from "../../../public/offer.jpg";

import styles from "./OurServices.module.css";

type ServiceItem = {
  image: StaticImageData;
  title: string;
  description: string;
  category: string;
};

const services: ServiceItem[] = [
  {
    image: guidedTour,
    title: "🧑‍🌾 Guided Farm Tours",
    category: "Educational",
    description:
      "Walk through working farms with expert guides who share insights into crops, techniques, and rural life in Kenya.",
  },
  {
    image: communityMarket,
    title: "🧺 Community Market Days",
    category: "Marketing",
    description:
      "Experience the bustle of local farmers' markets—shop fresh produce, handmade goods, and connect with local vendors.",
  },
  {
    image: workshops,
    title: "🌱 Educational Workshops",
    category: "Workshops",
    description:
      "Interactive sessions for all ages covering sustainable farming, seed planting, composting, and eco-farming methods.",
  },
  {
    image: livestock,
    title: "🐄 Livestock",
    category: "Farm Visits",
    description:
      "Safe, fun introductions to farm animals like cows, goats, and chickens — perfect for families and school groups.",
  },
  {
    image: ecoAgri,
    title: "🌍 Eco-Agritourism Packages",
    category: "Agritourism",
    description:
      "Explore curated rural retreats with low-impact lodging, organic meals, and immersive cultural farming experiences.",
  },
];

export default function OurServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(
    services[0]
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>What We Offer</h2>

        <div className={styles.contentWrapper}>
          {/* Left Section */}
          <div className={styles.left}>
            <h2 className={styles.title}>Our Services</h2>
            <Image src={offer} alt="Farm offer" className={styles.image} />
            <p className={styles.description}>
              We offer immersive farm experiences that bring you closer to
              nature, local communities, and sustainable living — through guided
              tours, workshops, market days, and unforgettable farm-to-table
              encounters.
            </p>
          </div>

          {/* Right Section */}
          <div className={styles.right}>
            <div className={styles.buttonGroup}>
              {services.map((service) => (
                <button
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className={`${styles.button} ${
                    selectedService.category === service.category
                      ? styles.active
                      : ""
                  }`}
                >
                  {service.category}
                </button>
              ))}
            </div>

            <div className={styles.card}>
              <div className={styles.cardContentWrapper}>
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    className={styles.cardImage}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className={styles.cardText}>
                  <h4 className={styles.cardTitle}>{selectedService.title}</h4>
                  <p className={styles.cardDescription}>
                    {selectedService.description}
                  </p>
                  <div className={styles.cardSpacer} />
                </div>
              </div>

              <Link href="/about" className={styles.seeAllButton}>
                See All →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
