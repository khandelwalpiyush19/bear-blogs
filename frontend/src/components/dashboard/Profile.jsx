import { motion } from "framer-motion";
import { Bookmark, Edit3, FileText, Home, LayoutDashboard, LogOut, User } from "lucide-react";
const Profile = () => (

  
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md p-6"
  >
    <h2 className="text-2xl font-bold text-amber-900 mb-6">Profile Settings</h2>
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-amber-200 mb-4 overflow-hidden border-4 border-amber-300">
            <div className="w-full h-full flex items-center justify-center text-amber-600">
              <User size={48} />
            </div>
          </div>
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm">
            Change Photo
          </button>
          <div className="mt-6 w-full">
            <h3 className="font-semibold text-amber-800 mb-3">Account Info</h3>
            <div className="space-y-2">
              <p className="text-sm text-amber-700"><span className="font-medium">Joined:</span> {new Date().toLocaleDateString()}</p>
              <p className="text-sm text-amber-700"><span className="font-medium">Blogs:</span> 24</p>
              <p className="text-sm text-amber-700"><span className="font-medium">Last Active:</span> Today</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-2/3">
        <form className="space-y-6">
          <div>
            <label className="block text-amber-800 font-medium mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-800 font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-amber-800 font-medium mb-2">Bio</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              defaultValue="Writer and blogger passionate about technology and design."
            ></textarea>
          </div>
          <div>
            <label className="block text-amber-800 font-medium mb-2">Change Password</label>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </motion.div>)


export default Profile;