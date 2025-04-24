
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Props {
  posts: Post[];
  error?: string;
}

const Home: NextPage<Props> = ({ posts, error }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js SSR Proxy Example</title>
        <meta name="description" content="SSR and API proxy example" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Next.js SSR Proxy Example</h1>

        {error ? (
          <div className="error-message">
            Error: {error}
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <div key={post.id} className={styles.card}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Using relative URL to ensure it works in both development and production
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const response = await fetch(`${protocol}://${host}/api/proxy`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const posts = await response.json();

    return {
      props: {
        posts: posts.slice(0, 4), // Limit to 4 posts for demo
      },
    };
  } catch (error) {
    console.error('SSR Error:', error);
    return {
      props: {
        posts: [],
        error: 'Failed to load data',
      },
    };
  }
};

export default Home;
