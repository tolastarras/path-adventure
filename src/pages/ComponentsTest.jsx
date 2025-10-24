import { GlossyButton, GlossyCard } from "../components";

const ComponentsTest = () => {
  return (
    <div className="flex flex-col mx-auto gap-8 max-w-4xl pt-20 pb-10 space-y-5">
      <div>
        <h1 className="text-3xl mb-5">Glossy Button</h1>
        <GlossyButton onClick={() => console.log('Button clicked')} variant="primary" size="md">Click Me</GlossyButton>
      </div>

      <div>
        <h1 className="text-3xl mb-5">Glossy Card</h1>
        <GlossyCard
          title="Dramatic Top Glow"
          description="Sky blue illumination focus"
        >
          <p>these are the children</p>
          <button>test</button>
        </GlossyCard>
      </div>
    </div>
  );
}

export default ComponentsTest