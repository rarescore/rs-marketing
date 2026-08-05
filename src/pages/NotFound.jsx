import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo'
export default function NotFound(){return <><Seo title="Page not found | LG Growth Studio" noindex/><section className="not-found"><div><span>404</span><p className="eyebrow">Wrong turn</p><h1>This page left<br/>the campaign.</h1><p>The link may be outdated, or the page may have moved.</p><Link className="button button-acid" to="/"><ArrowLeft/> Back to home</Link></div></section></>}
