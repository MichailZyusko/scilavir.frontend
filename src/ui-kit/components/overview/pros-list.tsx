type TPros = {
  name: string;
  description: string
};

const pros: TPros[] = [{
  name: 'Достоинтсво 1',
  description: 'Описание Описание Описание',
}, {
  name: 'Достоинтсво 2',
  description: 'Описание Описание Описание',
}, {
  name: 'Достоинтсво 3',
  description: 'Описание Описание Описание',
}, {
  name: 'Достоинтсво 4',
  description: 'Описание Описание Описание',
}, {
  name: 'Достоинтсво 5',
  description: 'Описание Описание Описание',
}];

function Pros({ description, name }: TPros) {
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
    <div className="flex justify-between mt-20">
      {pros.map(({ description, name }) => <Pros description={description} name={name} />) }
    </div>
  );
}
