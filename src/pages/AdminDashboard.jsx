import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiLogOut, FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  const queryClient = useQueryClient();

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    category: 'Full Stack',
    liveLink: '',
    codeLink: ''
  });

  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin_projects'],
    queryFn: async () => {
      const res = await axiosInstance.get('/projects');
      return res.data;
    },
    enabled: !!token
  });


  const createMutation = useMutation({
    mutationFn: async (newProj) => await axiosInstance.post('/projects', newProj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project added successfully');
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => await axiosInstance.put(`/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project updated successfully');
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosInstance.delete(`/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project deleted');
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/admin/login', { password });
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        tags: project.tags ? project.tags.join(', ') : '',
        category: project.category || 'Full Stack',
        liveLink: project.liveLink || '',
        codeLink: project.codeLink || ''
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', description: '', image: '', tags: '', category: 'Full Stack', liveLink: '', codeLink: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiData = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject._id, data: apiData });
    } else {
      createMutation.mutate(apiData);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 relative">
        <a href="/" className="absolute top-6 left-6 text-slate-400 hover:text-cyan-400 font-medium transition-colors">
          &larr; Back to Website
        </a>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-cyan-500 focus:outline-none text-white"
                placeholder="Enter password..."
                required
              />
            </div>
            <button className="w-full py-3 bg-cyan-500 rounded-xl text-slate-900 font-bold hover:bg-cyan-400 transition-colors">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10">Admin Panel</h2>
          
          <a href="/" className="text-sm font-medium text-slate-400 hover:text-cyan-400 mb-6 transition-colors">
            &larr; Back to Website
          </a>

          <nav className="flex-1 space-y-4">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'about' ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              About Section
            </button>
            <button 
              onClick={() => setActiveTab('skills')}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'skills' ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              Skills
            </button>
          </nav>
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors mt-auto pt-6">
            <FiLogOut /> Logout
          </button>
        </aside>
        
        <main className="flex-1 p-6 md:p-12 overflow-y-auto">
          {activeTab === 'projects' && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Projects</h1>
                <button 
                  onClick={() => openModal()}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-900 rounded-lg font-medium hover:bg-cyan-400 transition-colors"
                >
                  <FiPlus /> Add Project
                </button>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                {isLoading ? (
                  <p className="text-center py-10 text-slate-400">Loading projects...</p>
                ) : projects?.length === 0 ? (
                  <p className="text-center py-10 text-slate-400">No projects found. Add one!</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-800 border-b border-slate-700">
                        <tr>
                          <th className="p-4 font-medium text-slate-300">Project</th>
                          <th className="p-4 font-medium text-slate-300">Category</th>
                          <th className="p-4 font-medium text-slate-300">Links</th>
                          <th className="p-4 font-medium text-slate-300 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects?.map((proj) => (
                          <tr key={proj._id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={proj.image || 'https://via.placeholder.com/50'} alt={proj.title} className="w-12 h-12 rounded object-cover border border-slate-700" />
                                <div>
                                  <p className="font-semibold text-white">{proj.title}</p>
                                  <p className="text-xs text-slate-500 truncate max-w-[200px]">{proj.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="px-2 py-1 bg-slate-800 rounded text-xs text-cyan-400">{proj.category}</span>
                            </td>
                            <td className="p-4 space-x-2">
                              {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Live</a>}
                              {proj.codeLink && <a href={proj.codeLink} target="_blank" rel="noreferrer" className="text-xs text-purple-400 hover:underline">Code</a>}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => openModal(proj)} className="p-2 bg-slate-800 text-slate-300 rounded hover:text-cyan-400 transition-colors"><FiEdit /></button>
                                <button onClick={() => handleDelete(proj._id)} className="p-2 bg-slate-800 text-slate-300 rounded hover:text-red-400 transition-colors"><FiTrash2 /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'about' && <AboutSettings />}
          
          {activeTab === 'skills' && <SkillsSettings />}
        </main>
      </div>

      {/* Modal for Add / Edit Project */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
                <h3 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                <button onClick={closeModal} className="text-slate-400 hover:text-white"><FiX size={24} /></button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Project Title</label>
                    <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none">
                      <option>Full Stack</option>
                      <option>Frontend</option>
                      <option>Static</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Image URL</label>
                  <input type="url" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Tags (Comma separated)</label>
                  <input type="text" required value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" placeholder="React, Node.js, Tailwind..." />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Live URL</label>
                    <input type="url" value={formData.liveLink} onChange={(e) => setFormData({...formData, liveLink: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-1">Code URL</label>
                    <input type="url" value={formData.codeLink} onChange={(e) => setFormData({...formData, codeLink: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={closeModal} className="px-5 py-2 rounded-lg font-medium text-slate-300 hover:bg-slate-800">Cancel</button>
                  <button type="submit" disabled={createMutation.isLoading || updateMutation.isLoading} className="px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-70">
                    {editingProject ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AboutSettings = () => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['admin_profile'],
    queryFn: async () => {
      const res = await axiosInstance.get('/profile');
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => await axiosInstance.put('/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_profile'] });
      toast.success('About section updated successfully');
    }
  });

  const [formData, setFormData] = useState({
    title: '',
    description1: '',
    description2: '',
    experience: '',
    projects: ''
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        title: profile.title || '',
        description1: profile.description1 || '',
        description2: profile.description2 || '',
        experience: profile.experience || '',
        projects: profile.projects || ''
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <p className="text-slate-400">Loading...</p>;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">About Section Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Title</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Description 1</label>
          <textarea rows={4} value={formData.description1} onChange={(e) => setFormData({...formData, description1: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none resize-none"></textarea>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Description 2</label>
          <textarea rows={4} value={formData.description2} onChange={(e) => setFormData({...formData, description2: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none resize-none"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Experience (e.g. '2+')</label>
            <input type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Projects (e.g. '50+')</label>
            <input type="text" value={formData.projects} onChange={(e) => setFormData({...formData, projects: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" />
          </div>
        </div>
        <button type="submit" disabled={updateMutation.isLoading} className="mt-4 px-6 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-70">
          Save Changes
        </button>
      </form>
    </div>
  );
};

const SkillsSettings = () => {
  const queryClient = useQueryClient();
  const { data: skills, isLoading } = useQuery({
    queryKey: ['admin_skills'],
    queryFn: async () => {
      const res = await axiosInstance.get('/skills');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data) => await axiosInstance.post('/skills', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_skills'] });
      toast.success('Skill added');
      setFormData({ name: '', level: 50, category: 'Frontend' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosInstance.delete(`/skills/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_skills'] });
      toast.success('Skill deleted');
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    category: 'Frontend'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-400 mb-1">Skill Name</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500" />
          </div>
          <div className="w-32">
            <label className="block text-sm text-slate-400 mb-1">Level (%)</label>
            <input type="number" min="0" max="100" required value={formData.level} onChange={(e) => setFormData({...formData, level: parseInt(e.target.value)})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500" />
          </div>
          <div className="w-48">
            <label className="block text-sm text-slate-400 mb-1">Category</label>
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500">
              <option>Frontend</option>
              <option>Backend</option>
              <option>Tools</option>
            </select>
          </div>
          <button type="submit" disabled={createMutation.isLoading} className="px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-70 h-[42px]">
            Add Skill
          </button>
        </form>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {isLoading ? (
          <p className="p-6 text-slate-400">Loading skills...</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="p-4 font-medium text-slate-300">Name</th>
                <th className="p-4 font-medium text-slate-300">Category</th>
                <th className="p-4 font-medium text-slate-300">Level</th>
                <th className="p-4 font-medium text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills?.map((skill) => (
                <tr key={skill._id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="p-4 font-medium">{skill.name}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-slate-800 rounded text-xs text-purple-400">{skill.category}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-800 rounded-full h-1.5 max-w-[100px]">
                        <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                      </div>
                      <span className="text-xs text-slate-400">{skill.level}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => deleteMutation.mutate(skill._id)} className="p-2 bg-slate-800 text-slate-300 rounded hover:text-red-400 transition-colors"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;