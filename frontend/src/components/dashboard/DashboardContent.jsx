import { motion } from "framer-motion";

const DashboardContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-2xl font-bold text-amber-900 mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-800">Total Blogs</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">24</p>
      </div>
      <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-800">Drafts</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">3</p>
      </div>
      <div className="bg-amber-100 p-6 rounded-lg border border-amber-200">
        <h3 className="font-semibold text-amber-800">Published</h3>
        <p className="text-3xl font-bold text-amber-600 mt-2">21</p>
      </div>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-amber-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-4 border-b border-amber-100 last:border-0">
            <p className="text-amber-700">You published "Getting Started with Bear Blogs"</p>
            <p className="text-sm text-amber-500 mt-1">2 days ago</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default DashboardContent;