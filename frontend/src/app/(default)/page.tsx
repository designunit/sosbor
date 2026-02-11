import { HeroSection } from '@/components/IndexPage/HeroSection'
import { TimelineSection } from '@/components/IndexPage/TimelineSection'
import { MapCTA } from '@/components/IndexPage/MapCTA'
import { SurveyCTA } from '@/components/IndexPage/SurveyCTA'
import { Sponsors } from '@/components/IndexPage/Sponsors'

export default function Page() {
    return (
        <>
            <HeroSection />
            <TimelineSection />
            <MapCTA />
            <SurveyCTA />
            <Sponsors />
        </>
    )
}
