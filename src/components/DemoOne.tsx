import { ScrollingFeatureShowcase } from "@/components/ui/interactive-scrolling-story-component";

interface DemoProps {
  onOpenModal?: () => void;
}

export default function DemoOne({ onOpenModal }: DemoProps) {
  return <ScrollingFeatureShowcase onOpenModal={onOpenModal} />;
}
