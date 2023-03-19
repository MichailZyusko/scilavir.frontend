type TProps = {
  name: string;
  price: number;
};

export function Product({ name, price }: TProps) {
  return (
    <div className="flex flex-col items-start mb-8">
      <div className="w-full h-64 bg-gray mb-2.5" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="whitespace-normal text-center">
        {price}
        &nbsp;
        BYN
      </p>
    </div>
  );
}
