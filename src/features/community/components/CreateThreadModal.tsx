import React, { useState } from 'react';
import { Tag, AlignLeft, Type, HelpCircle } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface CreateThreadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; content: string; category: string; tags: string[] }) => void;
}

export const CreateThreadModal: React.FC<CreateThreadModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            content,
            category,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean)
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Start a New Discussion"
            maxWidth="2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Topic Title</label>
                        <Input
                            icon={<Type size={18} />}
                            placeholder="What's on your mind?"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>

                    {/* Category */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-novara-500 font-medium text-slate-700"
                                >
                                    <option value="General">General</option>
                                    <option value="Course Content">Course Content</option>
                                    <option value="Technical">Technical Support</option>
                                    <option value="Project">Project Collaboration</option>
                                </select>
                                <HelpCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Tags (comma separated)</label>
                            <Input
                                icon={<Tag size={18} />}
                                placeholder="react, help, bug..."
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Details</label>
                        <div className="relative">
                            <textarea
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-novara-500 min-h-[150px] resize-y font-medium text-slate-700 leading-relaxed"
                                placeholder="Describe your question or topic in detail..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <AlignLeft className="absolute left-3 top-3 text-slate-400" size={18} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Post Discussion
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
