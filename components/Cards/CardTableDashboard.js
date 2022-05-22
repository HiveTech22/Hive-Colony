import Dropdown from "../Dropdown";
import SearchInput from "../SearchInput";
import DropdownLink, { DropdownButton } from "../../components/DropdownLink";


const CardTableDashboard = () => {
    return (
        <>
            <div className="pt-6 px-4">                        
                <div className="">
                    <div className="p-4 flex justify-between items-center">
                        <SearchInput type="text" id="table-search" placeholder="Search for items"/>
                            <Dropdown
                                align="right"
                                width="48"
                                trigger={
                                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                                        <div className="flex items-center px-4">
                                            <div className="flex-shrink-0">

                                                Action
                                            </div>
                                        </div>

                                        <div className="ml-1">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                    </button>
                                }
                            >
                                <DropdownLink href="/favourites">
                                    Favourites
                                </DropdownLink>
                            </Dropdown>
                    </div>
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">Acquisition Overview</h3>
                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">Top Channels</th>
                                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">Users</th>
                                        <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Organic Search</th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">5,649</td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                            <span className="mr-2 text-xs font-medium">30%</span>
                                            <div className="relative w-full">
                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                    <div className="bg-cyan-600 h-2 rounded-sm w-32"></div>
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Referral</th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">4,025</td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                            <span className="mr-2 text-xs font-medium">24%</span>
                                            <div className="relative w-full">
                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                    <div className="bg-orange-300 h-2 rounded-sm w-24"></div>
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Direct</th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">3,105</td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                            <span className="mr-2 text-xs font-medium">18%</span>
                                            <div className="relative w-full">
                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                    <div className="bg-teal-400 h-2 rounded-sm w-20"></div>
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Social</th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">1251</td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                            <span className="mr-2 text-xs font-medium">12%</span>
                                            <div className="relative w-full">
                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                    <div className="bg-pink-600 h-2 rounded-sm w-12"></div>
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">Other</th>
                                        <td className="border-t-0 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">734</td>
                                        <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4">
                                            <div className="flex items-center">
                                            <span className="mr-2 text-xs font-medium">9%</span>
                                            <div className="relative w-full">
                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                    <div className="bg-indigo-600 h-2 rounded-sm w-9"></div>
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="text-gray-500">
                                        <th className="border-t-0 align-middle text-sm font-normal whitespace-nowrap p-4 pb-0 text-left">Email</th>
                                        <td className="border-t-0 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4 pb-0">456</td>
                                        <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0">
                                            <div className="flex items-center">
                                            <span className="mr-2 text-xs font-medium">7%</span>
                                            <div className="relative w-full">
                                                <div className="w-full bg-gray-200 rounded-sm h-2">
                                                    <div className="bg-purple-500 h-2 rounded-sm w-7"></div>
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
}

export default CardTableDashboard;