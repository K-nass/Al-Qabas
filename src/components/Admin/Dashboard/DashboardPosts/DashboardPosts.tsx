import { useCategories } from "@/hooks/useCategories";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { useState } from "react";

export default function DashboardPosts() {

    const { data: categories } = useCategories();
    const { data: posts } = useFetchPosts();
    const [category, setCategory] = useState(null)
    console.log(posts?.data.items);

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Posts</h2>
                    <button type="button" className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary text-white rounded-md bg-[#13967B] cursor-pointer font-bold">
                        <span>Add Post</span>
                    </button>
                </div>
                <form className="bg-white p-4 rounded-md mb-5">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        <div className="col-span-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="show">Show</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="show">
                                <option>15</option>
                                <option>30</option>
                                <option>50</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="language">Language</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="language">
                                <option>All</option>
                                <option>English</option>
                                <option>Arabic</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="post-type">Post Type</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="post-type">
                                <option>All</option>
                                <option>Article</option>
                                <option>Video</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="category">Category</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="category">
                                <option value="all">All</option>
                                {categories?.data.map(option => (
                                    <option value={option.id} key={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="subcategory">Subcategory</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="subcategory">
                                <option>All</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="text-sm font-medium text-gray-700" htmlFor="user">User</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="user">
                                <option>Select</option>
                            </select>
                        </div>
                        <div className="col-span-2 flex items-end space-x-2">
                            <div className="grow">
                                <label className="text-sm font-medium text-gray-700" htmlFor="search">Search</label>
                                <input className="mt-1 block w-8/12 p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-gray-900" id="search" placeholder="Search" type="text" />
                            </div>
                            <button type="submit" className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md h-[38px] cursor-pointer">Filter</button>
                        </div>
                    </div>
                </form>

                <div className="bg-white w-full rounded-md overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 bg-gray-50 ">
                            <tr>
                                <th className="p-4" scope="col"><input className="rounded border-gray-300  text-indigo-600 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-900" type="checkbox" /></th>
                                <th className="px-6 py-3" scope="col">Id</th>
                                <th className="px-6 py-3 min-w-[300px]" scope="col">Post</th>
                                <th className="px-6 py-3" scope="col">Language</th>
                                <th className="px-6 py-3 whitespace-nowrap" scope="col">Post Type</th>
                                <th className="px-6 py-3" scope="col">Category</th>
                                <th className="px-6 py-3" scope="col">Author</th>
                                <th className="px-6 py-3" scope="col">Pageviews</th>
                                <th className="px-6 py-3" scope="col">Date</th>
                                <th className="px-6 py-3" scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts?.data.items.map(item =>
                                <tr key={item.id} className="bg-white  border-b  hover:bg-gray-50 ">
                                    <td className="w-4 p-4"><input className="rounded border-gray-300  text-indigo-600 focus:ring-indigo-500 bg-gray-100 dark:bg-gray-900" type="checkbox" /></td>
                                    {/* <td className="px-6 py-4">{item.id}</td> */}
                                    <td className="px-6 py-4">
                                        <div className="overflow-x-auto max-w-[100px] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-gray-100">
                                            <div className="min-w-20 whitespace-nowrap mb-5">
                                                {item.id}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <img alt={item.imageDescription} className="w-24 h-16 object-cover rounded-md" src={item.image} />
                                            <span className="font-medium text-gray-900 ">{item.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{item.language}</td>
                                    <td className="px-6 py-4">Article</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">{item.categoryName}</span></td>
                                    <td className="px-6 py-4 font-medium text-gray-900 ">{item.authorName}</td>
                                    <td className="px-6 py-4">{item.viewsCount}</td>
                                    <td className="px-6 py-4">
                                        {new Date(item.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="flex items-center space-x-1 px-3 py-2 text-xs text-white bg-indigo-500 rounded-md hover:bg-indigo-600 cursor-pointer">
                                            <span>Select an option</span>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
