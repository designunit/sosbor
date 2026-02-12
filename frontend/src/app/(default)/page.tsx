import { HeroSection } from "@/components/IndexPage/HeroSection"
import { MapCTA } from "@/components/IndexPage/MapCTA"
import { Sponsors } from "@/components/IndexPage/Sponsors"
import { SurveyCTA } from "@/components/IndexPage/SurveyCTA"
import { TimelineSection } from "@/components/IndexPage/TimelineSection"

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
