// TextIngredients.tsx

export const TextIngredients = () => {
  const clocks: string[] = ['⏰', '⏳', '⌚️', '🕐', '🕰'];
  const emotional_ingredients: string[] = [
    'patience',
    'empathy',
    'tenacity',
    'candor',
    'gratitude',
    'self-awareness',
    'accountability',
    'optimism',
    'empathy',
    'curiosity',
    'conviction',
    'humilty',
    'ambition',
  ];
  const start_verbs: string[] = [
    'start',
    'begin',
    'launch',
    'lead',
    'drive',
    'steer',
    'flood',
    'power',
    'open',
  ];
  function create_statement(clocks: string[], emotional_ingredients: string[]): string {
    const random_element_from_array = (some_array: string[]) => {
      if (some_array) return some_array[Math.floor(Math.random() * some_array.length)];
      else return false;
    };
    let clock: string | boolean = random_element_from_array(clocks);
    let emo_ingredient: string | boolean = random_element_from_array(emotional_ingredients);
    let start_v: string | boolean = random_element_from_array(start_verbs);
    const potential_outputs: string[] = [
      `${clock} this morning is perfect for ${emo_ingredient}`,
      `${clock} make ${emo_ingredient} a priority this morning.`,
      `${clock} ${start_v} today with ${emo_ingredient}`,
      `${clock} share your ${emo_ingredient} with the 🌏`,
    ];
    let statement: string = `${random_element_from_array(potential_outputs)}`;
    return statement;
  }
  return (
    <span
      style={{
        color: 'white',
        marginRight: 10,
        fontSize: 15,
        fontFamily: 'Inter-Bold',
      }}
    >
      {create_statement(clocks, emotional_ingredients)}
    </span>
  );
};
