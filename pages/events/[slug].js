import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import styles from "../../styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { IoChatbubble } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EventPage({ evt }) {
  const router = useRouter();
  const deleteEvent = async (e) => {
    console.log("delete");

    if (confirm("Are you Sure you want to delete this?")) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout title={router.query.slug}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/respond/${evt.id}`}>
            <a>
              <IoChatbubble />
              Respond to the request
            </a>
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes></FaTimes>
            Delete Request
          </a>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString("en-UK")} at {evt.time}
        </span>

        <h1>{evt.name}</h1>
        <ToastContainer />
        {
          <div className="image">
            { evt.image!==null?<Image src={evt.image.url} width={660} height={300} />:<Image src={"/images/Blood-Donation-Transparent-Background.png"} width={660} height={300} />}
           
          </div>
        }
        <h3>BloodType:</h3>
        <p>{evt.BloodType}</p>
        <h3>Units:</h3>
        <p>{evt.units}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue:{evt.venue}</h3>
        <p>{evt.address}</p>
        <h3>Contact Number:</h3>
        <p>{evt.Phone}</p>

        <Link href="/events">
          <a className={styles.back}>{" <"}Go Back </a>
        </Link>
      </div>
    </Layout>
  );
}
/*
export async function getServerSideProps({query:{slug}})
{
  
  const res= await fetch(`${API_URL}/api/events/${slug}`);

  const events= await res.json()
  return{

    props:{
      evt:events[0],

    },

  }
}*/
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();
  const paths = events.map((evt) => ({
    params: {
      slug: evt.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);

  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
    revalidate: 1,
  };
}
