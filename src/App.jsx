import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const Services = lazy(() => import('./pages/Services'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Audit = lazy(() => import('./pages/Audit'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="route-loader" role="status"><span/>Loading</div>}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/pricing" element={<Pricing/>}/>
          <Route path="/audit" element={<Audit/>}/>
          <Route path="/insights" element={<Insights/>}/>
          <Route path="/insights/:slug" element={<Article/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/privacy" element={<Legal type="privacy"/>}/>
          <Route path="/terms" element={<Legal type="terms"/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </Layout>
  )
}
