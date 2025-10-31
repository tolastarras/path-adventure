import { GlossyButton, GlossyCard, NumberInput } from "../../new/components";

const ComponentsTest = () => {
  const handleChange = (newCount) => {
    console.log('Count changed to:', newCount);
  };

  return (
    <div className="flex flex-col mx-auto gap-8 w-full p-20 space-y-5 text-white/90 bg-blue-500 grow">
      <div>
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

      <div>
        <h1 className="text-3xl mb-5">Number Input</h1>
        <GlossyCard title="Squares:" className='max-w-[250px]'>
          <NumberInput onChange={handleChange} />
        </GlossyCard>
      </div>
    </div>
  );
}

export default ComponentsTest;
