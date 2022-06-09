import type { NextPage } from 'next';
interface props{
	data: any
	dishName?: string;
    menge?: string | null;
    zutat?: string;

}

const Ingridients: NextPage<props> = ({data}) => {
	return (
		<div>
			
                    {data.map((value: any, idx: number) => {
                        if (idx === 1) {
                            return (
                                <h1
                                    key={idx}
                                    className="text-2xl font-bold mb-4"
                                >
                                    {value.dishName}
                                </h1>
                            );
                        }
                    })}
                    {data.map((value: any, idx: number) => {
                        return (
                            <div
                                key={idx}
                                className="flex space-x-5 text-right w-full justify-between"
                            >
                                <h1>{value.zutat}</h1>
                                <h1 className="text-right">{value.menge}</h1>
                            </div>
                        );
                    })}
		</div>
	)
}
export default Ingridients;
