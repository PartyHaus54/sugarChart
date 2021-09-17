import Head from 'next/head';
import Charts from '../components/Charts';
import { useRouter } from 'next/Router';

export default function ChartsPage () {
  const router = useRouter();
  return (
    <Charts/>
  )
}