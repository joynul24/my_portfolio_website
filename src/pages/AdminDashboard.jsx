import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiLogOut, FiPlus, FiEdit, FiTrash2, FiX, FiMenu } from 'react-icons/fi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import axiosInstance from '../api/axiosInstance';

const PROJECT_CATEGORIES = [
  'E-Commerce', 'EdTech', 'FinTech',
  'Healthcare', 'Business & Agency', 'Real Estate',
];

const AdminDashboard = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  
  // Local state for live drag and drop tracking
  const [localProjects, setLocalProjects] = useState([]);
  const [isReorganizeOpen, setIsReorganizeOpen] = useState(false);

  const queryClient = useQueryClient();

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', image: '', tags: '',
    category: PROJECT_CATEGORIES[0], liveLink: '', codeLink: ''
  });

  // Fetch Projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ['admin_projects'],
    queryFn: async () => {
      const res = await axiosInstance.get('/projects');
      return res.data;
    },
    enabled: !!token
  });

  // Sync server data to local state for sorting
  useEffect(() => {
    if (projects) {
      setLocalProjects(projects);
    }
  }, [projects]);

  // Handle Drag and Drop ending position
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(localProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLocalProjects(items);
  };

  // Mutation to save sorted order to the backend database
  const saveOrderMutation = useMutation({
    mutationFn: async (updatedList) => {
      const payload = {
        sortedProjects: updatedList.map((proj) => ({
          _id: proj._id,
        }))
      };

      const res = await axiosInstance.put('/projects/reorder', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project sequence updated successfully');
      setIsReorganizeOpen(false);
    },
    onError: (error) => {
      console.error("Reorder Error Details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to save project sequence');
    }
  });

  // Create Project Mutation
  const createMutation = useMutation({
    mutationFn: async (newProj) => {
      const res = await axiosInstance.post('/projects', newProj);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project added successfully');
      closeModal();
    },
    onError: () => { toast.error('Failed to add project'); }
  });

  // Update Project Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await axiosInstance.put(`/projects/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project updated successfully');
      closeModal();
    },
    onError: () => { toast.error('Failed to update project'); }
  });

  // Delete Project Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/projects/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin_projects'] });
      toast.success('Project deleted');
    },
    onError: () => { toast.error('Failed to delete project'); }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/admin/login', { password });
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
      toast.success('Logged in successfully');
    } catch (err) { toast.error('Invalid credentials'); }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('adminToken');
    toast.success('Logged out successfully');
  };

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '', description: project.description || '', image: project.image || '',
        tags: project.tags ? project.tags.join(', ') : '', category: project.category || PROJECT_CATEGORIES[0],
        liveLink: project.liveLink || '', codeLink: project.codeLink || ''
      });
    } else {
      setEditingProject(null);
      setFormData({ title: '', description: '', image: '', tags: '', category: PROJECT_CATEGORIES[0], liveLink: '', codeLink: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiData = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
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
        <a href="/" className="absolute top-6 left-6 text-slate-400 hover:text-cyan-400 font-medium transition-colors">&larr; Back to Website</a>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-white mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-cyan-500 focus:outline-none text-white" placeholder="Enter password..." required />
            </div>
            <button className="w-full py-3 bg-cyan-500 rounded-xl text-slate-900 font-bold hover:bg-cyan-400 transition-colors">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-10">Admin Panel</h2>
          <a href="/" className="text-sm font-medium text-slate-400 hover:text-cyan-400 mb-6 transition-colors">&larr; Back to Website</a>
          <nav className="flex-1 space-y-4">
            <button onClick={() => setActiveTab('projects')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'projects' ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'}`}>Projects</button>
            <button onClick={() => setActiveTab('about')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'about' ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'}`}>About Section</button>
            <button onClick={() => setActiveTab('skills')} className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'skills' ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-slate-800 text-slate-400'}`}>Skills</button>
          </nav>
          <button onClick={logout} className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors mt-auto pt-6"><FiLogOut /> Logout</button>
        </aside>
        
        {/* Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 md:p-12 overflow-y-auto w-full max-w-full">
          {activeTab === 'projects' && (
            <>
              {/* Responsive Title Header wrapper */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Manage Projects</h1>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button onClick={() => setIsReorganizeOpen(true)} className="flex-1 sm:flex-none text-center px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm sm:text-base">Reorganize</button>
                  <button onClick={() => openModal()} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500 text-slate-900 rounded-lg font-medium hover:bg-cyan-400 transition-colors text-sm sm:text-base"><FiPlus /> Add Project</button>
                </div>
              </div>
              
              {isLoading ? (
                <p className="text-center py-10 text-slate-400">Loading projects...</p>
              ) : localProjects.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-slate-400">No projects found. Add one!</div>
              ) : (
                /* Table wrapper with overflow-x-auto handles responsive text clipping */
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden w-full">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left min-w-[700px] border-collapse">
                      <thead className="bg-slate-950/40 border-b border-slate-800">
                        <tr>
                          <th className="p-4 text-xs font-semibold text-slate-400 tracking-wider w-[45%]">Project Info</th>
                          <th className="p-4 text-xs font-semibold text-slate-400 tracking-wider w-[25%]">Category</th>
                          <th className="p-4 text-xs font-semibold text-slate-400 tracking-wider w-[15%]">Links</th>
                          <th className="p-4 text-xs font-semibold text-slate-400 tracking-wider text-right w-[15%]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {localProjects.map((proj) => (
                          <tr key={proj._id} className="border-b border-slate-800/40 hover:bg-slate-800/10">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={proj.image || 'https://via.placeholder.com/50'} alt={proj.title} className="w-12 h-12 rounded-lg object-cover border border-slate-700 flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="font-semibold text-white text-sm truncate">{proj.title}</p>
                                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{proj.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="inline-block px-2 py-1 bg-slate-800 rounded text-xs text-cyan-400 truncate max-w-full">
                                {proj.category}
                              </span>
                            </td>
                            <td className="p-4 space-x-3 whitespace-nowrap">
                              {proj.liveLink && <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-xs font-medium text-cyan-400 hover:text-cyan-300">Live</a>}
                              {proj.codeLink && <a href={proj.codeLink} target="_blank" rel="noreferrer" className="text-xs font-medium text-purple-400 hover:text-purple-300">Code</a>}
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => openModal(proj)} className="p-2 bg-slate-800/80 text-slate-300 rounded-lg hover:text-cyan-400"><FiEdit size={16} /></button>
                                <button onClick={() => handleDelete(proj._id)} className="p-2 bg-slate-800/80 text-slate-300 rounded-lg hover:text-red-400"><FiTrash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'about' && <AboutSettings />}
          {activeTab === 'skills' && <SkillsSettings />}
        </main>
      </div>

      {/* Fiverr-like Reorganize Modal popup */}
      <AnimatePresence>
        {isReorganizeOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white text-slate-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Reorganize your projects</h3>
                <button onClick={() => setIsReorganizeOpen(false)} className="text-slate-400 hover:text-slate-600"><FiX size={22} /></button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-1">
                <p className="text-xs text-slate-500 mb-6">Drag and drop your portfolio projects in the order you want them to be seen by potential clients.</p>
                
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="projects-list">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                        {localProjects.map((proj, index) => (
                          <Draggable key={proj._id} draggableId={proj._id} index={index}>
                            {(provided, snapshot) => (
                              <div 
                                ref={provided.innerRef} 
                                {...provided.draggableProps} 
                                className={`flex items-center gap-4 p-3 bg-white border rounded-xl transition-shadow ${snapshot.isDragging ? 'shadow-lg border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200'}`}
                              >
                                <span className="text-sm font-bold text-slate-400 w-4">{index + 1}</span>
                                <img src={proj.image || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-lg object-cover border bg-slate-100" />
                                <span className="font-semibold text-slate-800 text-sm flex-1 truncate">{proj.title}</span>
                                <div {...provided.dragHandleProps} className="text-slate-400 hover:text-slate-600 p-1 cursor-grab active:cursor-grabbing">
                                  <FiMenu size={18} />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={() => { setIsReorganizeOpen(false); setLocalProjects(projects); }} className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                <button onClick={() => saveOrderMutation.mutate(localProjects)} disabled={saveOrderMutation.isPending} className="px-6 py-2 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-50">
                  {saveOrderMutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* standard CRUD Form modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8">
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
                      {PROJECT_CATEGORIES.map((cat) => (<option key={cat} value={cat} className="bg-slate-900 text-white">{cat}</option>))}
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
                  <input type="text" required value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" placeholder="React, Node.js..." />
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
                  <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-70">
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

// About management section subcomponent
const AboutSettings = () => {
  const queryClient = useQueryClient();
  const { data: profile, isLoading } = useQuery({ queryKey: ['admin_profile'], queryFn: async () => { const res = await axiosInstance.get('/profile'); return res.data; } });
  const updateMutation = useMutation({ mutationFn: async (data) => { const res = await axiosInstance.put('/profile', data); return res.data; }, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin_profile'] }); toast.success('About section updated successfully'); }, onError: () => { toast.error('Failed to update About section'); } });
  const [formData, setFormData] = useState({ title: '', description1: '', description2: '', experience: '', projects: '' });
  useEffect(() => { if (profile) { setFormData({ title: profile.title || '', description1: profile.description1 || '', description2: profile.description2 || '', experience: profile.experience || '', projects: profile.projects || '' }); } }, [profile]);
  const handleSubmit = (e) => { e.preventDefault(); updateMutation.mutate(formData); };
  if (isLoading) return <p className="text-slate-400 p-6">Loading...</p>;
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">About Section Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm text-slate-400 mb-1">Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" /></div>
        <div><label className="block text-sm text-slate-400 mb-1">Description 1</label><textarea rows={4} value={formData.description1} onChange={(e) => setFormData({...formData, description1: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none resize-none"></textarea></div>
        <div><label className="block text-sm text-slate-400 mb-1">Description 2</label><textarea rows={4} value={formData.description2} onChange={(e) => setFormData({...formData, description2: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none resize-none"></textarea></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm text-slate-400 mb-1">Experience</label><input type="text" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" /></div>
          <div><label className="block text-sm text-slate-400 mb-1">Projects</label><input type="text" value={formData.projects} onChange={(e) => setFormData({...formData, projects: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-cyan-500 outline-none" /></div>
        </div>
        <button type="submit" disabled={updateMutation.isPending} className="mt-4 px-6 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-70">Save Changes</button>
      </form>
    </div>
  );
};

// Skills management section subcomponent
const SkillsSettings = () => {
  const queryClient = useQueryClient();
  const { data: skills, isLoading } = useQuery({ queryKey: ['admin_skills'], queryFn: async () => { const res = await axiosInstance.get('/skills'); return res.data; } });
  const createMutation = useMutation({ mutationFn: async (data) => { const res = await axiosInstance.post('/skills', data); return res.data; }, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin_skills'] }); toast.success('Skill added'); setFormData({ name: '', level: 50, category: 'Frontend' }); }, onError: () => { toast.error('Failed to add skill'); } });
  const deleteMutation = useMutation({ mutationFn: async (id) => { const res = await axiosInstance.delete(`/skills/${id}`); return res.data; }, onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin_skills'] }); toast.success('Skill deleted'); }, onError: () => { toast.error('Failed to delete skill'); } });
  const [formData, setFormData] = useState({ name: '', level: 50, category: 'Frontend' });
  const handleAdd = (e) => { e.preventDefault(); createMutation.mutate(formData); };
  const handleDeleteSkill = (id) => { if (window.confirm('Are you sure you want to delete this skill?')) { deleteMutation.mutate(id); } };
  return (
    <div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]"><label className="block text-sm text-slate-400 mb-1">Skill Name</label><input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500" /></div>
          <div className="w-32"><label className="block text-sm text-slate-400 mb-1">Level (%)</label><input type="number" min="0" max="100" required value={formData.level} onChange={(e) => setFormData({...formData, level: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500" /></div>
          <div className="w-48"><label className="block text-sm text-slate-400 mb-1">Category</label><select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white outline-none focus:border-cyan-500"><option>Frontend</option><option>Backend</option><option>Tools</option></select></div>
          <button type="submit" disabled={createMutation.isPending} className="px-5 py-2 bg-cyan-500 text-slate-900 rounded-lg font-bold hover:bg-cyan-400 disabled:opacity-70 h-[42px]">Add Skill</button>
        </form>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {isLoading ? ( <p className="p-6 text-slate-400">Loading skills...</p> ) : skills?.length === 0 ? ( <p className="p-6 text-slate-400 text-center">No skills found. Add one!</p> ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[500px]">
              <thead className="bg-slate-800 border-b border-slate-700"><tr><th className="p-4 font-medium text-slate-300">Name</th><th className="p-4 font-medium text-slate-300">Category</th><th className="p-4 font-medium text-slate-300">Level</th><th className="p-4 font-medium text-slate-300 text-right">Actions</th></tr></thead>
              <tbody>
                {skills?.map((skill) => (
                  <tr key={skill._id} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                    <td className="p-4 font-medium">{skill.name}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-slate-800 rounded text-xs text-purple-400">{skill.category}</span></td>
                    <td className="p-4"><div className="flex items-center gap-2"><div className="w-full bg-slate-800 rounded-full h-1.5 max-w-[100px]"><div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }}></div></div><span className="text-xs text-slate-400">{skill.level}%</span></div></td>
                    <td className="p-4 text-right"><button onClick={() => handleDeleteSkill(skill._id)} className="p-2 bg-slate-800 text-slate-300 rounded hover:text-red-400"><FiTrash2 /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;