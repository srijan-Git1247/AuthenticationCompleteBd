import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import { API_URL } from "../config/index";
import RequestItem from "../components/RequestItem";
export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Emergency Requests</h1>
      {events === 0 && <h1>No Requests</h1>}

      {events.map((evt) => (
        <RequestItem key={evt.id} evt={evt} />
      ))}
      <div>
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View Other Requests</a>
        </Link>
      )}
      </div>

    </Layout>
  );
}
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=4`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
