type TPros = {
  id: number;
  name: string;
  description: string;
};

const pros: TPros[] = [
  {
    id: 1,
    name: 'Достоинтсво 1',
    description: 'Описание Описание Описание',
  },
  {
    id: 2,
    name: 'Достоинтсво 2',
    description: 'Описание Описание Описание',
  },
  {
    id: 3,
    name: 'Достоинтсво 3',
    description: 'Описание Описание Описание',
  },
  {
    id: 4,
    name: 'Достоинтсво 4',
    description: 'Описание Описание Описание',
  },
  {
    id: 5,
    name: 'Достоинтсво 5',
    description: 'Описание Описание Описание',
  }];

function Pros({ description, name }: Omit<TPros, 'id'>) {
  return (
    <div className="flex flex-col w-min items-center justify-center">
      <div className="w-44 h-44 bg-gray" />
      <h2>{name}</h2>
      <p className="whitespace-normal text-center">{description}</p>
    </div>
  );
}

export function ProsList() {
  return (
    <div className="container mx-auto flex justify-between mt-20">
      {pros.map(({ description, name, id }) => (
        <Pros
          key={id}
          description={description}
          name={name}
        />
      ))}
    </div>
  );
}
