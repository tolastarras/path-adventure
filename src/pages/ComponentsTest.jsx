import { GlossyButton, GlossyCard } from "../components";

const ComponentsTest = () => {
  return (
    <div className="flex flex-col mx-auto gap-8 w-full h-100-vh p-20 space-y-5 text-white/90 bg-blue-500">
      <div className>
        <h1 className="text-3xl mb-5">Glossy Button</h1>
        <GlossyButton
          onClick={() => console.log('Button clicked')}
          size="md"
          variant="transparent"
        >
          Click Me
        </GlossyButton>
      </div>

      <div>
        <h1 className="text-3xl mb-5">Glossy Card</h1>
        <GlossyCard
          title="Dramatic Top Glow"
          description="Sky blue illumination focus"
          showGlare
        >
          <p>these are the children</p>
          <button>test</button>
        </GlossyCard>
      </div>
    </div>
  );
}

export default ComponentsTest