import {MdChevronRight} from "react-icons/md";

const Technologies = () => {
    return (
        <div className="flex lg:flex-row flex-col gap-5 lg:mt-32 mb-10">
            <div className="flex flex-col gap-10 p-5 rounded-xl border border-gray-500 lg:w[50vw]">
                <div className="flex flex-col gap-5">
                    <h1 className="md:text-5xl text-lg text-gray-800 font-bold dark:text-white">Technology</h1>
                    <p className="text-gray-800 dark:text-white">
                        Trendy Shoes crafts inspiring ecommerce experiences for our buyers, sellers, and developers. For
                        over 25 years, embracing innovation has been fundamental to our growth and customer loyalty,
                        leveraging technologies like AI, computer vision, natural language processing, and machine
                        translation.
                    </p>
                </div>

                <div
                    className="flex items-center gap-2 text-gray-800 dark:text-white hover:underline transform duration-300 cursor-pointer font-bold">
                    <p>Learn more</p>
                    <MdChevronRight/>
                </div>
            </div>

            <div className="flex flex-col gap-10 p-5 rounded-xl border border-gray-500 lg:w[50vw]">
                <div className="flex flex-col gap-5">
                    <h1 className="md:text-5xl text-lg text-gray-800 font-bold dark:text-white">Impact</h1>
                    <p className="text-gray-800 dark:text-white">
                        Every day, people build businesses on Trendy Shoes. Nonprofit organizations raise essential
                        funds. Entrepreneurs acquire new skills and access new markets, transforming their dreams and
                        ideas into successful ventures.
                    </p>
                </div>

                <div
                    className="flex items-center gap-2 text-gray-800 dark:text-white hover:underline transform duration-300 cursor-pointer font-bold">
                    <p>Learn more</p>
                    <MdChevronRight/>
                </div>
            </div>
        </div>
    );
};

export default Technologies;
