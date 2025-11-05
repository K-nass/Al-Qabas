import Loader from "@/components/Loader/Loader";
import { useCategories } from "@/hooks/useCategories";
import { useFetchPosts } from "@/hooks/useFetchPosts";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPosts({ label }: { label?: string }) {
    const { data: categories } = useCategories();
    const [category, setCategory] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [searchPhrase, setSearchPhrase] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);
    let isSlider = false;
    let isFeatured = false;
    let isBreaking = false;


    if (label == "Slider Posts") isSlider = true;
    if (label === "Featured Posts") isFeatured = true
    if (label === "Breaking News") isBreaking = true

    const { data: posts, isLoading } = useFetchPosts({
        category: category ?? undefined,
        language,
        searchPhrase,
        pageNumber,
        pageSize,
        isSlider,
        isFeatured,
        isBreaking,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pageNumber]);

    return (
        <div className="flex-1 flex flex-col overflow-hidden bg-[var(--bg-primary)]">
            <div className="flex-1 overflow-y-auto p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-[var(--text-primary)]">{label}</h2>
                    <button
                        type="button"
                        className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold bg-[#13967B] hover:bg-[#0e7a64] text-white rounded-lg shadow-md transition-all"
                    >
                        <span>Add Post</span>
                    </button>
                </div>

                {/* Filters */}
                <form className="bg-[var(--bg-secondary)] p-5 rounded-lg shadow-sm mb-6 border border-[var(--border)]">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {/* Page size */}
                        <div>
                            <label className="text-sm font-medium text-[var(--text-primary)]">Show</label>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="mt-1 block w-full rounded-md border-[var(--border)] focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]"
                            >
                                {[15, 30, 60, 90].map((num) => (
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Language */}
                        <div>
                            <label className="text-sm font-medium text-[var(--text-primary)]">Language</label>
                            <select
                                onChange={(e) => setLanguage(e.target.value)}
                                className="mt-1 block w-full rounded-md border-[var(--border)] focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]"
                            >
                                <option value="all">All</option>
                                <option value="English">English</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                        </div>

                        {/* Post Type */}
                        <div>
                            <label className="text-sm font-medium text-[var(--text-primary)]">Post Type</label>
                            <select className="mt-1 block w-full rounded-md border-[var(--border)] focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]">
                                <option>All</option>
                                <option>Article</option>
                                <option>Video</option>
                            </select>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-sm font-medium text-[var(--text-primary)]">Category</label>
                            <select
                                value={category ?? ""}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full rounded-md border-[var(--border)] focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]"
                            >
                                <option value="all">All</option>
                                {categories?.data.map((option) => (
                                    <option key={option.id} value={option.slug}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory */}
                        <div>
                            <label className="text-sm font-medium text-[var(--text-primary)]">Subcategory</label>
                            <select className="mt-1 block w-full rounded-md border-[var(--border)] focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]">
                                <option>All</option>
                            </select>
                        </div>

                        {/* User */}
                        <div>
                            <label className="text-sm font-medium text-[var(--text-primary)]">User</label>
                            <select className="mt-1 block w-full rounded-md border-[var(--border)] focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]">
                                <option>Select</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="col-span-2 flex items-end space-x-2">
                            <input
                                id="search"
                                placeholder="Search"
                                value={searchPhrase ?? ""}
                                onChange={(e) => setSearchPhrase(e.target.value)}
                                className="grow mt-1 block p-2 border-[var(--border)] rounded-md focus:ring-[#13967B] focus:border-[#13967B] sm:text-sm text-[var(--text-primary)] bg-[var(--bg-primary)]"
                                type="text"
                            />
                        </div>
                    </div>
                </form>

                {/* Table */}
                <div className="bg-[var(--bg-secondary)] rounded-lg shadow-md border border-[var(--border)] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-[var(--text-secondary)] border-collapse">
                            <thead className="text-xs uppercase text-[var(--text-primary)] bg-[var(--bg-primary)] sticky top-0 z-10">
                                <tr>
                                    <th className="p-4"><input type="checkbox" className="rounded border-gray-300 text-[#13967B]" /></th>
                                    <th className="px-6 py-3">Id</th>
                                    <th className="px-6 py-3 min-w-[300px]">Post</th>
                                    <th className="px-6 py-3">Language</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Author</th>
                                    <th className="px-6 py-3">Views</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3 text-right">Options</th>
                                </tr>
                            </thead>

                            <AnimatePresence mode="wait">
                                {isLoading ? (
                                    <motion.tbody
                                        key="loader"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <tr>
                                            <td colSpan={10} className="text-center py-10">
                                                <Loader />
                                            </td>
                                        </tr>
                                    </motion.tbody>
                                ) : (
                                    <motion.tbody
                                        key="table"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        {posts?.data.items.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-[var(--border)] hover:bg-[var(--bg-primary)] transition-colors"
                                            >
                                                <td className="p-4"><input type="checkbox" className="rounded border-[var(--border)] text-[#13967B]" /></td>
                                                <td className="px-6 py-4 text-[var(--text-primary)]">{item.id}</td>
                                                <td className="px-6 py-4 flex items-center space-x-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.imageDescription}
                                                        className="w-24 h-16 object-cover rounded-md shadow-sm"
                                                    />
                                                    <span className="font-medium text-[var(--text-primary)]">{item.title}</span>
                                                </td>
                                                <td className="px-6 py-4 text-[var(--text-primary)]">{item.language}</td>
                                                <td className="px-6 py-4 text-[var(--text-primary)]">Article</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 text-xs font-medium text-white bg-[#13967B] rounded-full">
                                                        {item.categoryName}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-[var(--text-primary)]">{item.authorName}</td>
                                                <td className="px-6 py-4 text-[var(--text-primary)]">{item.viewsCount}</td>
                                                <td className="px-6 py-4 text-[var(--text-primary)]">
                                                    {new Date(item.updatedAt).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="px-3 py-2 text-xs bg-[#13967B] text-white rounded-md hover:bg-[#0e7a64] transition-all">
                                                        Manage
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </motion.tbody>
                                )}
                            </AnimatePresence>
                        </table>
                    </div>

                    {/* Pagination */}
                    {posts?.data && posts.data.totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 py-4 bg-[var(--bg-primary)] cursor-pointer">
                            <button
                                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                                disabled={pageNumber === 1}
                                className={`px-3 py-1 border rounded-md cursor-pointer ${pageNumber === 1
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                ‹
                            </button>
                            {Array.from({ length: posts.data.totalPages }, (_, i) => i + 1).map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPageNumber(num)}
                                    className={`px-3 py-1 border rounded-md cursor-pointer ${pageNumber === num
                                        ? "bg-[#13967B] text-white border-[#13967B]"
                                        : "text-gray-700 hover:bg-gray-100 border-gray-200"
                                        }`}
                                >
                                    {num}
                                </button>
                            ))}
                            <button
                                onClick={() =>
                                    setPageNumber((prev) =>
                                        posts?.data.totalPages ? Math.min(prev + 1, posts.data.totalPages) : prev
                                    )
                                }
                                disabled={pageNumber === posts?.data.totalPages}
                                className={`px-3 py-1 border rounded-md cursor-pointer ${pageNumber === posts?.data.totalPages
                                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
