// import { useState } from 'react';
// import { ChevronDownIcon, DownloadIcon } from '@heroicons/react/outline';

// export default function NoteEditor({ initialData, onSave }) {
//   const [formData, setFormData] = useState(initialData || {
//     title: '',
//     content: '',
//     scriptType: 'business_rule',
//     project: '',
//     tags: []
//   });
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const scriptTypes = [
//     'business_rule',
//     'script_include',
//     'client_script',
//     'scheduled_job',
//     'ui_action',
//     'email_template',
//     'ui_script',
//     'widget'
//   ];

//   const handleDownload = (format = 'txt') => {
//     if (!formData.content) return;

//     let content, extension;

//     switch(format) {
//       case 'json':
//         content = JSON.stringify({
//           title: formData.title,
//           content: formData.content,
//           type: formData.scriptType,
//           project: formData.project,
//           tags: formData.tags,
//           created: new Date().toISOString()
//         }, null, 2);
//         extension = 'json';
//         break;
//       case 'xml':
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = 'xml';
//         break;
//       default: // txt
//         content = formData.content;
//         extension = 'txt';
//     }

//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, '_')}_${formData.scriptType}.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleSave = () => {
//     onSave(formData);
//     setShowSavedPopup(true);

//     // Close the popup after 3 seconds
//     setTimeout(() => {
//       setShowSavedPopup(false);
//     }, 1000);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-start">
//         <div>
//           {/* <h2 className="text-2xl font-bold text-black">
//             {initialData ? 'Edit Script' : 'Create New Script'}
//           </h2> */}
//           <p className="text-sm text-gray-600 mt-1">
//             {initialData ? 'Update your existing script' : 'Create a new ServiceNow script'}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Download
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload('txt');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <span className="mr-2">📄</span> Text (.txt)
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('json');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <span className="mr-2">📊</span> JSON (.json)
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('xml');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <span className="mr-2">📋</span> XML (.xml)
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <form onSubmit={(e) => {
//         e.preventDefault();
//         handleSave();
//       }} className="space-y-6">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-black">
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           <div>
//             <label htmlFor="scriptType" className="block text-sm font-medium text-black">
//               Script Type *
//             </label>
//             <select
//               id="scriptType"
//               value={formData.scriptType}
//               onChange={(e) => setFormData({...formData, scriptType: e.target.value})}
//               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
//               required
//             >
//               {scriptTypes.map(type => (
//                 <option key={type} value={type}>
//                   {type.replace(/_/g, ' ').toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="project" className="block text-sm font-medium text-black">
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) => setFormData({...formData, project: e.target.value})}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         <div>
//           <label htmlFor="content" className="block text-sm font-medium text-black">
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) => setFormData({...formData, content: e.target.value})}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
//             required
//             placeholder="Paste your script here..."
//           />
//         </div>

//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             {initialData ? 'Update Script' : 'Save Script'}
//           </button>
//         </div>
//       </form>

//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-20">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center w-72">
//             <div role="alert" className="alert alert-success">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current text-green-500" fill="none" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-black">Your script has been saved successfully!</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import { ChevronDownIcon, DownloadIcon } from '@heroicons/react/outline';

// export default function NoteEditor({ initialData, onSave }) {
//   const [formData, setFormData] = useState(initialData || {
//     title: '',
//     content: '',
//     scriptType: 'business_rule',
//     project: '',
//     tags: []
//   });
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const scriptTypes = [
//     'business_rule',
//     'script_include',
//     'client_script',
//     'scheduled_job',
//     'ui_action',
//     'email_template',
//     'ui_script',
//     'widget'
//   ];

//   const handleDownload = (format = 'txt') => {
//     if (!formData.content) return;

//     let content, extension;

//     switch(format) {
//       case 'json':
//         content = JSON.stringify({
//           title: formData.title,
//           content: formData.content,
//           type: formData.scriptType,
//           project: formData.project,
//           tags: formData.tags,
//           created: new Date().toISOString()
//         }, null, 2);
//         extension = 'json';
//         break;
//       case 'xml':
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = 'xml';
//         break;
//       default: // txt
//         content = formData.content;
//         extension = 'txt';
//     }

//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, '_')}_${formData.scriptType}.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleSave = () => {
//     onSave(formData);
//     setShowSavedPopup(true);

//     // Close the popup after 3 seconds
//     setTimeout(() => {
//       setShowSavedPopup(false);
//     }, 1000);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-start">
//         <div>
//           {/* <h2 className="text-2xl font-bold text-black">
//             {initialData ? 'Edit Script' : 'Create New Script'}
//           </h2> */}
//           <p className="text-sm text-gray-600 mt-1">
//             {initialData ? 'Update your existing script' : 'Create a new ServiceNow script'}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Download
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload('txt');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <span className="mr-2">📄</span> Text (.txt)
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('json');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <span className="mr-2">📊</span> JSON (.json)
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('xml');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     <span className="mr-2">📋</span> XML (.xml)
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <form onSubmit={(e) => {
//         e.preventDefault();
//         handleSave();
//       }} className="space-y-6">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-black">
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           <div>
//             <label htmlFor="scriptType" className="block text-sm font-medium text-black">
//               Script Type *
//             </label>
//             <select
//               id="scriptType"
//               value={formData.scriptType}
//               onChange={(e) => setFormData({ ...formData, scriptType: e.target.value })}
//               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md text-black"
//               required
//             >
//               {scriptTypes.map(type => (
//                 <option key={type} value={type}>
//                   {type.replace(/_/g, ' ').toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div>
//           <label htmlFor="project" className="block text-sm font-medium text-black">
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) => setFormData({ ...formData, project: e.target.value })}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-black"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         <div>
//           <label htmlFor="content" className="block text-sm font-medium text-black">
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 font-mono text-sm text-black"
//             required
//             placeholder="Paste your script here..."
//           />
//         </div>

//         <div className="flex justify-end space-x-3">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             {initialData ? 'Update Script' : 'Save Script'}
//           </button>
//         </div>
//       </form>

//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-20">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center w-72">
//             <div role="alert" className="alert alert-success">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current text-green-500" fill="none" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               <span className="text-black">Your script has been saved successfully!</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import { ChevronDownIcon, DownloadIcon, SaveIcon, XIcon } from '@heroicons/react/outline';
// import { FiCode, FiFileText, FiDatabase, FiTag, FiFolder } from 'react-icons/fi';
// import { useAuth } from '../../services/auth';

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(initialData || {
//     title: '',
//     content: '',
//     scriptType: 'business_rule',
//     project: '',
//     tags: []
//   });
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const [showEmailDialog, setShowEmailDialog] = useState(false);  // Controls visibility of the email dialog
//   const [emailData, setEmailData] = useState({
//     to: '',
//     subject: '',
//     message: ''
//   });
//   const [emailStatus, setEmailStatus] = useState(null);

//   const scriptTypes = [
//     'business_rule',
//     'script_include',
//     'client_script',
//     'scheduled_job',
//     'ui_action',
//     'email_template',
//     'ui_script',
//     'widget'
//   ];

//   // Handle email send logic
//   const handleSendEmail = async () => {
//     setEmailStatus('sending');
//     try {
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           toEmail: emailData.to,
//           fromEmail: user.email,
//           subject: emailData.subject,
//           content: formData.content,
//           noteTitle: formData.title,
//           scriptType: formData.scriptType
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setEmailStatus('success');
//         setShowEmailDialog(false);  // Close dialog upon success
//       } else {
//         setEmailStatus('error');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setEmailStatus('error');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData ? 'Update your existing script' : 'Start writing your ServiceNow script'}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload('txt');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('json');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('xml');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         onSave(formData);
//         setShowSavedPopup(true);
//         setTimeout(() => setShowSavedPopup(false), 1000);
//       }} className="space-y-6">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label htmlFor="scriptType" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={(e) => setFormData({ ...formData, scriptType: e.target.value })}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map(type => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, ' ').toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? 'Update Script' : 'Save Script'}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => setShowEmailDialog(true)}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//           Send via Email
//         </button>
//       </div>

//       {/* Email Dialog */}
//       {showEmailDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Send Script via Email</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To Email
//                 </label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) => setEmailData({...emailData, to: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={emailData.subject || `ServiceNow Script: ${formData.title}`}
//                   onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Message (optional)
//                 </label>
//                 <textarea
//                   value={emailData.message}
//                   onChange={(e) => setEmailData({...emailData, message: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   rows="3"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowEmailDialog(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendEmail}
//                 disabled={emailStatus === 'sending'}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-70"
//               >
//                 {emailStatus === 'sending' ? 'Sending...' : 'Send Email'}
//               </button>
//             </div>

//             {emailStatus === 'success' && (
//               <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
//                 Email sent successfully!
//               </div>
//             )}
//             {emailStatus === 'error' && (
//               <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
//                 Failed to send email. Please try again.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import { ChevronDownIcon, DownloadIcon, SaveIcon, XIcon } from '@heroicons/react/outline';
// import { FiCode, FiFileText, FiDatabase, FiTag, FiFolder } from 'react-icons/fi';
// import { useAuth } from '../../services/auth';

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(initialData || {
//     title: '',
//     content: '',
//     scriptType: 'business_rule',
//     project: '',
//     tags: []
//   });
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const [showEmailDialog, setShowEmailDialog] = useState(false);  // Controls visibility of the email dialog
//   const [emailData, setEmailData] = useState({
//     to: '',
//     subject: '',
//     message: ''
//   });
//   const [emailStatus, setEmailStatus] = useState(null);

//   const scriptTypes = [
//     'business_rule',
//     'script_include',
//     'client_script',
//     'scheduled_job',
//     'ui_action',
//     'email_template',
//     'ui_script',
//     'widget'
//   ];

//   // Handle email send logic
//   const handleSendEmail = async () => {
//     setEmailStatus('sending');
//     try {
//       // Here we are ensuring the email content is sent in HTML format
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           toEmail: emailData.to,
//           fromEmail: user.email,
//           subject: emailData.subject,
//           content: `
//             <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//               <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
//                 <tr>
//                   <td style="text-align: center; padding-bottom: 20px;">
//                     <h1 style="color: #333333; font-size: 24px;">ServiceNow Script: ${formData.title}</h1>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="font-size: 16px; color: #555555; line-height: 1.5;">
//                     <p>Hello,</p>
//                     <p>This is the ServiceNow Script you requested:</p>
//                     <pre style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px; color: #333333; overflow-x: auto;">
// ${formData.content}</pre>
//                     <p>If you need any further assistance, feel free to reach out.</p>
//                     <p>Best regards,<br/>Your ServiceNow Team</p>
//                   </td>
//                 </tr>
//               </table>
//             </body>
//           `,
//           noteTitle: formData.title,
//           scriptType: formData.scriptType
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setEmailStatus('success');
//         setShowEmailDialog(false);  // Close dialog upon success
//       } else {
//         setEmailStatus('error');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setEmailStatus('error');
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData ? 'Update your existing script' : 'Start writing your ServiceNow script'}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload('txt');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('json');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('xml');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         onSave(formData);
//         setShowSavedPopup(true);
//         setTimeout(() => setShowSavedPopup(false), 1000);
//       }} className="space-y-6">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label htmlFor="scriptType" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={(e) => setFormData({ ...formData, scriptType: e.target.value })}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map(type => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, ' ').toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? 'Update Script' : 'Save Script'}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-between">
//         <button
//           type="button"
//           onClick={() => setShowEmailDialog(true)}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//           Send via Email
//         </button>
//       </div>

//       {/* Email Dialog */}
//       {showEmailDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Send Script via Email</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To Email
//                 </label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) => setEmailData({...emailData, to: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={emailData.subject || `ServiceNow Script: ${formData.title}`}
//                   onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Message (optional)
//                 </label>
//                 <textarea
//                   value={emailData.message}
//                   onChange={(e) => setEmailData({...emailData, message: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   rows="3"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowEmailDialog(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendEmail}
//                 disabled={emailStatus === 'sending'}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-70"
//               >
//                 {emailStatus === 'sending' ? 'Sending...' : 'Send Email'}
//               </button>
//             </div>

//             {emailStatus === 'success' && (
//               <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
//                 Email sent successfully!
//               </div>
//             )}
//             {emailStatus === 'error' && (
//               <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
//                 Failed to send email. Please try again.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from 'react';
// import { ChevronDownIcon, DownloadIcon, SaveIcon, XIcon } from '@heroicons/react/outline';
// import { FiCode, FiFileText, FiDatabase, FiTag, FiFolder } from 'react-icons/fi';
// import { useAuth } from '../../services/auth';

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(initialData || {
//     title: '',
//     content: '',
//     scriptType: 'business_rule',
//     project: '',
//     tags: []
//   });
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const [showEmailDialog, setShowEmailDialog] = useState(false);  // Controls visibility of the email dialog
//   const [emailData, setEmailData] = useState({
//     to: '',
//     subject: '',
//     message: ''
//   });
//   const [emailStatus, setEmailStatus] = useState(null);

//   const scriptTypes = [
//     'business_rule',
//     'script_include',
//     'client_script',
//     'scheduled_job',
//     'ui_action',
//     'email_template',
//     'ui_script',
//     'widget'
//   ];

//   // Handle email send logic
//   const handleSendEmail = async () => {
//     setEmailStatus('sending');
//     try {
//       // Here we are ensuring the email content is sent in HTML format
//       const response = await fetch('/api/send-email', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           toEmail: emailData.to,
//           fromEmail: user.email,
//           subject: emailData.subject,
//           content: `
//             <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//               <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
//                 <tr>
//                   <td style="text-align: center; padding-bottom: 20px;">
//                     <h1 style="color: #333333; font-size: 24px;">ServiceNow Script: ${formData.title}</h1>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="font-size: 16px; color: #555555; line-height: 1.5;">
//                     <p>Hello,</p>
//                     <p>This is the ServiceNow Script you requested:</p>
//                     <pre style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px; color: #333333; overflow-x: auto;">
// ${formData.content}</pre>
//                     <p>If you need any further assistance, feel free to reach out.</p>
//                     <p>Best regards,<br/>Your ServiceNow Team</p>
//                   </td>
//                 </tr>
//               </table>
//             </body>
//           `,
//           noteTitle: formData.title,
//           scriptType: formData.scriptType
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setEmailStatus('success');
//         setShowEmailDialog(false);  // Close dialog upon success
//       } else {
//         setEmailStatus('error');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setEmailStatus('error');
//     }
//   };

//   const handleDownload = (format = 'txt') => {
//     if (!formData.content) return;

//     let content, extension;

//     switch(format) {
//       case 'json':
//         content = JSON.stringify({
//           title: formData.title,
//           content: formData.content,
//           type: formData.scriptType,
//           project: formData.project,
//           tags: formData.tags,
//           created: new Date().toISOString()
//         }, null, 2);
//         extension = 'json';
//         break;
//       case 'xml':
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = 'xml';
//         break;
//       default: // txt
//         content = formData.content;
//         extension = 'txt';
//     }

//     const blob = new Blob([content], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, '_')}_${formData.scriptType}.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData ? 'Update your existing script' : 'Start writing your ServiceNow script'}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload('txt');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('json');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload('xml');
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form onSubmit={(e) => {
//         e.preventDefault();
//         onSave(formData);
//         setShowSavedPopup(true);
//         setTimeout(() => setShowSavedPopup(false), 1000);  // Show popup for 1 second
//       }} className="space-y-6">
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label htmlFor="scriptType" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={(e) => setFormData({ ...formData, scriptType: e.target.value })}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map(type => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, ' ').toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <FiFolder className="text-orange-500 mr-2" />
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) => setFormData({ ...formData, project: e.target.value })}
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? 'Update Script' : 'Save Script'}
//           </button>
//         </div>
//       </form>

//       {/* Email Dialog */}
//       {showEmailDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Send Script via Email</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To Email
//                 </label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) => setEmailData({...emailData, to: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={emailData.subject || `ServiceNow Script: ${formData.title}`}
//                   onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Message (optional)
//                 </label>
//                 <textarea
//                   value={emailData.message}
//                   onChange={(e) => setEmailData({...emailData, message: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   rows="3"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowEmailDialog(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendEmail}
//                 disabled={emailStatus === 'sending'}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-70"
//               >
//                 {emailStatus === 'sending' ? 'Sending...' : 'Send Email'}
//               </button>
//             </div>

//             {emailStatus === 'success' && (
//               <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
//                 Email sent successfully!
//               </div>
//             )}
//             {emailStatus === 'error' && (
//               <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
//                 Failed to send email. Please try again.
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Save Confirmation Popup */}
//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-gray-900">Script Saved!</h3>
//                 <p className="text-sm text-gray-500">Your changes have been successfully saved.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import {
//   ChevronDownIcon,
//   DownloadIcon,
//   SaveIcon,
//   XIcon,
// } from "@heroicons/react/outline";
// import {
//   FiCode,
//   FiFileText,
//   FiDatabase,
//   FiTag,
//   FiFolder,
// } from "react-icons/fi";
// import { useAuth } from "../../services/auth";

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(
//     initialData || {
//       title: "",
//       content: "",
//       scriptType: "business_rule",
//       project: "",
//       tags: [],
//     }
//   );
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const [showEmailDialog, setShowEmailDialog] = useState(false); // Controls visibility of the email dialog
//   const [emailData, setEmailData] = useState({
//     to: "",
//     subject: "",
//     message: "",
//   });
//   const [emailStatus, setEmailStatus] = useState(null);

//   const scriptTypes = [
//     "business_rule",
//     "script_include",
//     "client_script",
//     "scheduled_job",
//     "ui_action",
//     "email_template",
//     "ui_script",
//     "widget",
//   ];

//   // Handle email send logic
//   const handleSendEmail = async () => {
//     setEmailStatus("sending");
//     try {
//       // Here we are ensuring the email content is sent in HTML format
//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           toEmail: emailData.to,
//           fromEmail: user.email,
//           subject: emailData.subject,
//           content: `
//             <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//               <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
//                 <tr>
//                   <td style="text-align: center; padding-bottom: 20px;">
//                     <h1 style="color: #333333; font-size: 24px;">ServiceNow Script: ${formData.title}</h1>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="font-size: 16px; color: #555555; line-height: 1.5;">
//                     <p>Hello,</p>
//                     <p>This is the ServiceNow Script you requested:</p>
//                     <pre style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px; color: #333333; overflow-x: auto;">
// ${formData.content}</pre>
//                     <p>If you need any further assistance, feel free to reach out.</p>
//                     <p>Best regards,<br/>Your ServiceNow Developer Team at Exterprise</p>
//                   </td>
//                 </tr>
//               </table>
//             </body>
//           `,
//           noteTitle: formData.title,
//           scriptType: formData.scriptType,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setEmailStatus("success");
//         setShowEmailDialog(false); // Close dialog upon success
//       } else {
//         setEmailStatus("error");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setEmailStatus("error");
//     }
//   };

//   const handleDownload = (format = "txt") => {
//     if (!formData.content) return;

//     let content, extension;

//     switch (format) {
//       case "json":
//         content = JSON.stringify(
//           {
//             title: formData.title,
//             content: formData.content,
//             type: formData.scriptType,
//             project: formData.project,
//             tags: formData.tags,
//             created: new Date().toISOString(),
//           },
//           null,
//           2
//         );
//         extension = "json";
//         break;
//       case "xml":
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = "xml";
//         break;
//       default: // txt
//         content = formData.content;
//         extension = "txt";
//     }

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, "_")}_${
//       formData.scriptType
//     }.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData
//               ? "Update your existing script"
//               : "Start writing your ServiceNow script"}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload("txt");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("json");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("xml");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//           setShowSavedPopup(true);
//           setTimeout(() => setShowSavedPopup(false), 1000); // Show popup for 1 second
//         }}
//         className="space-y-6"
//       >
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, scriptType: e.target.value })
//                 }
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, " ").toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="project"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiFolder className="text-orange-500 mr-2" />
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) =>
//               setFormData({ ...formData, project: e.target.value })
//             }
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) =>
//               setFormData({ ...formData, content: e.target.value })
//             }
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? "Update Script" : "Save Script"}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={() => setShowEmailDialog(true)}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//           Send via Email
//         </button>
//       </div>

//       {/* Email Dialog */}
//       {showEmailDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Send Script via Email</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To Email
//                 </label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) =>
//                     setEmailData({ ...emailData, to: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={
//                     emailData.subject || `ServiceNow Script: ${formData.title}`
//                   }
//                   onChange={(e) =>
//                     setEmailData({ ...emailData, subject: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Message (optional)
//                 </label>
//                 <textarea
//                   value={emailData.message}
//                   onChange={(e) =>
//                     setEmailData({ ...emailData, message: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   rows="3"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowEmailDialog(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendEmail}
//                 disabled={emailStatus === "sending"}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-70"
//               >
//                 {emailStatus === "sending" ? "Sending..." : "Send Email"}
//               </button>
//             </div>

//             {emailStatus === "success" && (
//               <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
//                 Email sent successfully!
//               </div>
//             )}
//             {emailStatus === "error" && (
//               <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
//                 Failed to send email. Please try again.
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Save Confirmation Popup */}
//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="h-6 w-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Script Saved!
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Your changes have been successfully saved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   ChevronDownIcon,
//   DownloadIcon,
//   SaveIcon,
//   XIcon,
// } from "@heroicons/react/outline";
// import {
//   FiCode,
//   FiFileText,
//   FiDatabase,
//   FiTag,
//   FiFolder,
// } from "react-icons/fi";
// import { useAuth } from "../../services/auth";

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(
//     initialData || {
//       title: "",
//       content: "",
//       scriptType: "business_rule",
//       project: "",
//       tags: [],
//     }
//   );
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const [showEmailDialog, setShowEmailDialog] = useState(false); // Controls visibility of the email dialog
//   const [emailData, setEmailData] = useState({
//     to: "",
//     subject: "",
//     message: "",
//   });
//   const [emailStatus, setEmailStatus] = useState(null);

//   const scriptTypes = [
//     "business_rule",
//     "script_include",
//     "client_script",
//     "scheduled_job",
//     "ui_action",
//     "email_template",
//     "ui_script",
//     "widget",
//     "fix_script", // Added new script type
//     "background_script", // Added new script type
//   ];

//   // Handle email send logic
//   const handleSendEmail = async () => {
//     setEmailStatus("sending");
//     try {
//       // Here we are ensuring the email content is sent in HTML format
//       const response = await fetch("/api/send-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           toEmail: emailData.to,
//           fromEmail: user.email,
//           subject: emailData.subject,
//           content: `
//             <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//               <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
//                 <tr>
//                   <td style="text-align: center; padding-bottom: 20px;">
//                     <h1 style="color: #333333; font-size: 24px;">ServiceNow Script: ${formData.title}</h1>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style="font-size: 16px; color: #555555; line-height: 1.5;">
//                     <p>Hello,</p>
//                     <p>This is the ServiceNow Script you requested:</p>
//                     <pre style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 14px; color: #333333; overflow-x: auto;">
// ${formData.content}</pre>
//                     <p>If you need any further assistance, feel free to reach out.</p>
//                     <p>Best regards,<br/>Your ServiceNow Developer Team at Exterprise</p>
//                   </td>
//                 </tr>
//               </table>
//             </body>
//           `,
//           noteTitle: formData.title,
//           scriptType: formData.scriptType,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setEmailStatus("success");
//         setShowEmailDialog(false); // Close dialog upon success
//       } else {
//         setEmailStatus("error");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setEmailStatus("error");
//     }
//   };

//   const handleDownload = (format = "txt") => {
//     if (!formData.content) return;

//     let content, extension;

//     switch (format) {
//       case "json":
//         content = JSON.stringify(
//           {
//             title: formData.title,
//             content: formData.content,
//             type: formData.scriptType,
//             project: formData.project,
//             tags: formData.tags,
//             created: new Date().toISOString(),
//           },
//           null,
//           2
//         );
//         extension = "json";
//         break;
//       case "xml":
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = "xml";
//         break;
//       default: // txt
//         content = formData.content;
//         extension = "txt";
//     }

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, "_")}_${
//       formData.scriptType
//     }.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData
//               ? "Update your existing script"
//               : "Start writing your ServiceNow script"}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload("txt");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("json");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("xml");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//           setShowSavedPopup(true);
//           setTimeout(() => setShowSavedPopup(false), 1000); // Show popup for 1 second
//         }}
//         className="space-y-6"
//       >
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, scriptType: e.target.value })
//                 }
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, " ").toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="project"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiFolder className="text-orange-500 mr-2" />
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) =>
//               setFormData({ ...formData, project: e.target.value })
//             }
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) =>
//               setFormData({ ...formData, content: e.target.value })
//             }
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? "Update Script" : "Save Script"}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={() => setShowEmailDialog(true)}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//           Send via Email
//         </button>
//       </div>

//       {/* Email Dialog */}
//       {showEmailDialog && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h3 className="text-lg font-medium mb-4">Send Script via Email</h3>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   To Email
//                 </label>
//                 <input
//                   type="email"
//                   value={emailData.to}
//                   onChange={(e) =>
//                     setEmailData({ ...emailData, to: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   value={
//                     emailData.subject || `ServiceNow Script: ${formData.title}`
//                   }
//                   onChange={(e) =>
//                     setEmailData({ ...emailData, subject: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Additional Message (optional)
//                 </label>
//                 <textarea
//                   value={emailData.message}
//                   onChange={(e) =>
//                     setEmailData({ ...emailData, message: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   rows="3"
//                 />
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowEmailDialog(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSendEmail}
//                 disabled={emailStatus === "sending"}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-70"
//               >
//                 {emailStatus === "sending" ? "Sending..." : "Send Email"}
//               </button>
//             </div>

//             {emailStatus === "success" && (
//               <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
//                 Email sent successfully!
//               </div>
//             )}
//             {emailStatus === "error" && (
//               <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
//                 Failed to send email. Please try again.
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Save Confirmation Popup */}
//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="h-6 w-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Script Saved!
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Your changes have been successfully saved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import { useState } from "react";
// import {
//   ChevronDownIcon,
//   DownloadIcon,
//   SaveIcon,
//   XIcon,
// } from "@heroicons/react/outline";
// import {
//   FiCode,
//   FiFileText,
//   FiDatabase,
//   FiTag,
//   FiFolder,
// } from "react-icons/fi";
// import { useAuth } from "../../services/auth";

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(
//     initialData || {
//       title: "",
//       content: "",
//       scriptType: "business_rule",
//       project: "",
//       tags: [],
//     }
//   );
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const scriptTypes = [
//     "business_rule",
//     "script_include",
//     "client_script",
//     "scheduled_job",
//     "ui_action",
//     "email_template",
//     "ui_script",
//     "widget",
//     "fix_script",
//     "background_script",
//   ];

//   const handleDownload = (format = "txt") => {
//     if (!formData.content) return;

//     let content, extension;

//     switch (format) {
//       case "json":
//         content = JSON.stringify(
//           {
//             title: formData.title,
//             content: formData.content,
//             type: formData.scriptType,
//             project: formData.project,
//             tags: formData.tags,
//             created: new Date().toISOString(),
//           },
//           null,
//           2
//         );
//         extension = "json";
//         break;
//       case "xml":
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = "xml";
//         break;
//       default: // txt
//         content = formData.content;
//         extension = "txt";
//     }

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, "_")}_${
//       formData.scriptType
//     }.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleShareViaEmail = () => {
//     const subject = `ServiceNow Script: ${formData.title}`;
//     const body = `Here's the ServiceNow script you requested:

// Script Title: ${formData.title}
// Script Type: ${formData.scriptType.replace(/_/g, ' ').toUpperCase()}
// ${formData.project ? `Project: ${formData.project}` : ''}

// Script Content:
// ${formData.content}

// ---
// Sent from ServiceNow Script Manager`;

//     // Encode the subject and body for mailto URL
//     const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     // Open the default email client
//     window.location.href = mailtoUrl;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData
//               ? "Update your existing script"
//               : "Start writing your ServiceNow script"}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload("txt");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("json");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("xml");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//           setShowSavedPopup(true);
//           setTimeout(() => setShowSavedPopup(false), 1000);
//         }}
//         className="space-y-6"
//       >
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, scriptType: e.target.value })
//                 }
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, " ").toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Project Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="project"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiFolder className="text-orange-500 mr-2" />
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) =>
//               setFormData({ ...formData, project: e.target.value })
//             }
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) =>
//               setFormData({ ...formData, content: e.target.value })
//             }
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? "Update Script" : "Save Script"}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={handleShareViaEmail}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//           Share via Email
//         </button>
//       </div>

//       {/* Save Confirmation Popup */}
//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="h-6 w-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Script Saved!
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Your changes have been successfully saved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState } from "react";
// import {
//   ChevronDownIcon,
//   DownloadIcon,
//   SaveIcon,
//   XIcon,
// } from "@heroicons/react/outline";
// import {
//   FiCode,
//   FiFileText,
//   FiDatabase,
//   FiTag,
//   FiFolder,
// } from "react-icons/fi";
// import { useAuth } from "../../services/auth";

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(
//     initialData || {
//       title: "",
//       content: "",
//       scriptType: "business_rule",
//       scriptSubType: "before",
//       project: "",
//       tags: [],
//     }
//   );
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);

//   const scriptTypes = [
//     "business_rule",
//     "script_include",
//     "client_script",
//     "scheduled_job",
//     "ui_action",
//     "email_template",
//     "ui_script",
//     "widget",
//     "fix_script",
//     "email_script",
//     "background_script",
//   ];

//   const scriptSubTypes = {
//     business_rule: [
//       { value: "before", label: "Before" },
//       { value: "after", label: "After" },
//       { value: "async_after", label: "Async" },
//       { value: "display", label: "Display" },
//     ],
//     client_script: [
//       { value: "onLoad", label: "OnLoad" },
//       { value: "onChange", label: "OnChange" },
//       { value: "onSubmit", label: "OnSubmit" },
//       { value: "onCellEdit", label: "OnCellEdit" },
//     ],
//     script_include: [],
//     scheduled_job: [],
//     ui_action: [],
//     email_template: [],
//     ui_script: [],
//     widget: [],
//     fix_script: [],
//     email_script: [],
//     background_script: [],
//   };

//   const handleDownload = (format = "txt") => {
//     if (!formData.content) return;

//     let content, extension;

//     switch (format) {
//       case "json":
//         content = JSON.stringify(
//           {
//             title: formData.title,
//             content: formData.content,
//             type: formData.scriptType,
//             subType: formData.scriptSubType,
//             project: formData.project,
//             tags: formData.tags,
//             created: new Date().toISOString(),
//           },
//           null,
//           2
//         );
//         extension = "json";
//         break;
//       case "xml":
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     ${formData.scriptSubType ? `<subtype>${formData.scriptSubType}</subtype>` : ''}
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = "xml";
//         break;
//       default: // txt
//         content = formData.content;
//         extension = "txt";
//     }

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, "_")}_${
//       formData.scriptType
//     }.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleShareViaEmail = () => {
//     const subject = `ServiceNow Script: ${formData.title}`;
//     const body = `Here's the ServiceNow script you requested:

// Script Title: ${formData.title}
// Script Type: ${formData.scriptType.replace(/_/g, ' ').toUpperCase()}
// ${formData.scriptSubType ? `Script Sub-Type: ${formData.scriptSubType.replace(/_/g, ' ').toUpperCase()}\n` : ''}
// ${formData.project ? `Project: ${formData.project}` : ''}

// Script Content:
// ${formData.content}

// ---
// Sent from ServiceNow Script Manager`;

//     // Encode the subject and body for mailto URL
//     const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     // Open the default email client
//     window.location.href = mailtoUrl;
//   };

//   const handleScriptTypeChange = (e) => {
//     const newType = e.target.value;
//     setFormData({ 
//       ...formData, 
//       scriptType: newType,
//       scriptSubType: scriptSubTypes[newType]?.length > 0 ? scriptSubTypes[newType][0].value : ''
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData
//               ? "Update your existing script"
//               : "Start writing your ServiceNow script"}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload("txt");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("json");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("xml");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//           setShowSavedPopup(true);
//           setTimeout(() => setShowSavedPopup(false), 1000);
//         }}
//         className="space-y-6"
//       >
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={handleScriptTypeChange}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, " ").toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Script Sub-Type Field (conditionally rendered) */}
//         {scriptSubTypes[formData.scriptType]?.length > 0 && (
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptSubType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               {formData.scriptType.replace(/_/g, ' ').toUpperCase()} Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptSubType"
//                 value={formData.scriptSubType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, scriptSubType: e.target.value })
//                 }
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptSubTypes[formData.scriptType].map((subType) => (
//                   <option key={subType.value} value={subType.value}>
//                     {subType.label}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Project Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="project"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiFolder className="text-orange-500 mr-2" />
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) =>
//               setFormData({ ...formData, project: e.target.value })
//             }
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="content"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiCode className="text-orange-500 mr-2" />
//             Script Content *
//           </label>
//           <textarea
//             id="content"
//             rows={15}
//             value={formData.content}
//             onChange={(e) =>
//               setFormData({ ...formData, content: e.target.value })
//             }
//             className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm transition-all"
//             required
//             placeholder="// Paste your script here...\n// Business Rule example:\n\nfunction onChange(control, oldValue, newValue, isLoading) {\n    if (isLoading || newValue === '') {\n        return;\n    }\n    \n    // Your logic here\n}"
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? "Update Script" : "Save Script"}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={handleShareViaEmail}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//           Share via Email
//         </button>
//       </div>

//       {/* Save Confirmation Popup */}
//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="h-6 w-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Script Saved!
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Your changes have been successfully saved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useRef, useEffect } from "react";
// import {
//   ChevronDownIcon,
//   DownloadIcon,
//   SaveIcon,
//   XIcon,
// } from "@heroicons/react/outline";
// import {
//   FiCode,
//   FiFileText,
//   FiDatabase,
//   FiTag,
//   FiFolder,
// } from "react-icons/fi";
// import { useAuth } from "../../services/auth";
// import Editor from "@monaco-editor/react";

// export default function NoteEditor({ initialData, onSave }) {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState(
//     initialData || {
//       title: "",
//       content: "",
//       scriptType: "business_rule",
//       scriptSubType: "before",
//       project: "",
//       tags: [],
//     }
//   );
//   const [showDownloadMenu, setShowDownloadMenu] = useState(false);
//   const [showSavedPopup, setShowSavedPopup] = useState(false);
//   const [editorTheme, setEditorTheme] = useState("vs-light");
//   const editorRef = useRef(null);

//   const scriptTypes = [
//     "business_rule",
//     "script_include",
//     "client_script",
//     "scheduled_job",
//     "ui_action",
//     "email_template",
//     "ui_script",
//     "widget",
//     "fix_script",
//     "email_script",
//     "background_script",
//   ];

//   const scriptSubTypes = {
//     business_rule: [
//       { value: "before", label: "Before" },
//       { value: "after", label: "After" },
//       { value: "async_after", label: "Async" },
//       { value: "display", label: "Display" },
//     ],
//     client_script: [
//       { value: "onLoad", label: "OnLoad" },
//       { value: "onChange", label: "OnChange" },
//       { value: "onSubmit", label: "OnSubmit" },
//       { value: "onCellEdit", label: "OnCellEdit" },
//     ],
//     script_include: [],
//     scheduled_job: [],
//     ui_action: [],
//     email_template: [],
//     ui_script: [],
//     widget: [],
//     fix_script: [],
//     email_script: [],
//     background_script: [],
//   };

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
    
//     // Configure editor options
//     editor.updateOptions({
//       minimap: { enabled: true },
//       scrollBeyondLastLine: false,
//       fontSize: 14,
//       wordWrap: "on",
//       automaticLayout: true,
//     });

//     // Add custom keybindings
//     editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
//       document.getElementById("save-button").click();
//     });
//   };

//   const handleEditorChange = (value) => {
//     setFormData({ ...formData, content: value });
//   };

//   const handleDownload = (format = "txt") => {
//     if (!formData.content) return;

//     let content, extension;

//     switch (format) {
//       case "json":
//         content = JSON.stringify(
//           {
//             title: formData.title,
//             content: formData.content,
//             type: formData.scriptType,
//             subType: formData.scriptSubType,
//             project: formData.project,
//             tags: formData.tags,
//             created: new Date().toISOString(),
//           },
//           null,
//           2
//         );
//         extension = "json";
//         break;
//       case "xml":
//         content = `<?xml version="1.0" encoding="UTF-8"?>
// <servicenow-script>
//   <metadata>
//     <title>${formData.title}</title>
//     <type>${formData.scriptType}</type>
//     ${formData.scriptSubType ? `<subtype>${formData.scriptSubType}</subtype>` : ''}
//     <project>${formData.project}</project>
//     <created>${new Date().toISOString()}</created>
//   </metadata>
//   <content><![CDATA[${formData.content}]]></content>
// </servicenow-script>`;
//         extension = "xml";
//         break;
//       default: // txt
//         content = formData.content;
//         extension = "txt";
//     }

//     const blob = new Blob([content], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${formData.title.replace(/[^\w]/g, "_")}_${
//       formData.scriptType
//     }.${extension}`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   };

//   const handleShareViaEmail = () => {
//     const subject = `ServiceNow Script: ${formData.title}`;
//     const body = `Here's the ServiceNow script you requested:

// Script Title: ${formData.title}
// Script Type: ${formData.scriptType.replace(/_/g, ' ').toUpperCase()}
// ${formData.scriptSubType ? `Script Sub-Type: ${formData.scriptSubType.replace(/_/g, ' ').toUpperCase()}\n` : ''}
// ${formData.project ? `Project: ${formData.project}` : ''}

// Script Content:
// ${formData.content}

// ---
// Sent from ServiceNow Script Manager`;

//     const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//     window.location.href = mailtoUrl;
//   };

//   const handleScriptTypeChange = (e) => {
//     const newType = e.target.value;
//     setFormData({ 
//       ...formData, 
//       scriptType: newType,
//       scriptSubType: scriptSubTypes[newType]?.length > 0 ? scriptSubTypes[newType][0].value : ''
//     });
//   };

//   // Set up syntax highlighting based on script type
//   const getEditorLanguage = () => {
//     switch(formData.scriptType) {
//       case 'business_rule':
//       case 'script_include':
//       case 'client_script':
//       case 'scheduled_job':
//       case 'ui_action':
//       case 'ui_script':
//       case 'fix_script':
//       case 'background_script':
//         return 'javascript';
//       case 'email_template':
//       case 'email_script':
//         return 'html';
//       default:
//         return 'plaintext';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header Section */}
//       <div className="flex justify-between items-center pb-6 border-b border-orange-200">
//         <div>
//           <p className="text-sm text-gray-500 mt-1">
//             {initialData
//               ? "Update your existing script"
//               : "Start writing your ServiceNow script"}
//           </p>
//         </div>

//         {formData.content && (
//           <div className="relative">
//             <button
//               onClick={() => setShowDownloadMenu(!showDownloadMenu)}
//               className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
//             >
//               <DownloadIcon className="h-5 w-5 mr-2" />
//               Export
//               <ChevronDownIcon className="h-4 w-4 ml-2" />
//             </button>

//             {showDownloadMenu && (
//               <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
//                 <div className="py-1">
//                   <button
//                     onClick={() => {
//                       handleDownload("txt");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiFileText className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">Text File</div>
//                       <div className="text-xs text-gray-500">.txt format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("json");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiDatabase className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">JSON File</div>
//                       <div className="text-xs text-gray-500">.json format</div>
//                     </div>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleDownload("xml");
//                       setShowDownloadMenu(false);
//                     }}
//                     className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
//                   >
//                     <FiCode className="text-orange-500 mr-3" />
//                     <div>
//                       <div className="font-medium">XML File</div>
//                       <div className="text-xs text-gray-500">.xml format</div>
//                     </div>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Form Section */}
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           onSave(formData);
//           setShowSavedPopup(true);
//           setTimeout(() => setShowSavedPopup(false), 1000);
//         }}
//         className="space-y-6"
//       >
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//           {/* Title Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiFileText className="text-orange-500 mr-2" />
//               Script Title *
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={formData.title}
//               onChange={(e) =>
//                 setFormData({ ...formData, title: e.target.value })
//               }
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//               required
//               placeholder="e.g., Incident Priority Business Rule"
//             />
//           </div>

//           {/* Script Type Field */}
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               Script Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptType"
//                 value={formData.scriptType}
//                 onChange={handleScriptTypeChange}
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type.replace(/_/g, " ").toUpperCase()}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Script Sub-Type Field (conditionally rendered) */}
//         {scriptSubTypes[formData.scriptType]?.length > 0 && (
//           <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//             <label
//               htmlFor="scriptSubType"
//               className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               {formData.scriptType.replace(/_/g, ' ').toUpperCase()} Type *
//             </label>
//             <div className="relative">
//               <select
//                 id="scriptSubType"
//                 value={formData.scriptSubType}
//                 onChange={(e) =>
//                   setFormData({ ...formData, scriptSubType: e.target.value })
//                 }
//                 className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
//                 required
//               >
//                 {scriptSubTypes[formData.scriptType].map((subType) => (
//                   <option key={subType.value} value={subType.value}>
//                     {subType.label}
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
//                 <ChevronDownIcon className="h-5 w-5 text-gray-400" />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Project Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <label
//             htmlFor="project"
//             className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
//           >
//             <FiFolder className="text-orange-500 mr-2" />
//             Project Name
//           </label>
//           <input
//             id="project"
//             type="text"
//             value={formData.project}
//             onChange={(e) =>
//               setFormData({ ...formData, project: e.target.value })
//             }
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
//             placeholder="e.g., HR Service Portal Implementation"
//           />
//         </div>

//         {/* Content Field */}
//         <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
//           <div className="flex justify-between items-center mb-2">
//             <label
//               htmlFor="content"
//               className="block text-sm font-medium text-gray-700 flex items-center"
//             >
//               <FiCode className="text-orange-500 mr-2" />
//               Script Content *
//             </label>
//             <div className="flex items-center space-x-2">
//               <select
//                 value={editorTheme}
//                 onChange={(e) => setEditorTheme(e.target.value)}
//                 className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
//               >
//                 <option value="vs-light">Light Theme</option>
//                 <option value="vs-dark">Dark Theme</option>
//                 <option value="hc-black">High Contrast</option>
//               </select>
//             </div>
//           </div>
          
//           <div className="border border-gray-300 rounded-lg overflow-hidden">
//             <Editor
//               height="400px"
//               language={getEditorLanguage()}
//               theme={editorTheme}
//               value={formData.content}
//               onChange={handleEditorChange}
//               onMount={handleEditorDidMount}
//               options={{
//                 minimap: { enabled: true },
//                 scrollBeyondLastLine: false,
//                 fontSize: 14,
//                 wordWrap: "on",
//                 automaticLayout: true,
//                 renderWhitespace: "selection",
//                 tabSize: 2,
//                 insertSpaces: true,
//                 autoIndent: "full",
//                 formatOnPaste: true,
//                 formatOnType: true,
//                 suggestOnTriggerCharacters: true,
//                 quickSuggestions: true,
//                 folding: true,
//                 lineNumbers: "on",
//                 glyphMargin: true,
//                 scrollbar: {
//                   vertical: "auto",
//                   horizontal: "auto",
//                 },
//               }}
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
//           <button
//             type="button"
//             onClick={() => window.history.back()}
//             className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <XIcon className="h-4 w-4 mr-2" />
//             Cancel
//           </button>
//           <button
//             id="save-button"
//             type="submit"
//             className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
//           >
//             <SaveIcon className="h-4 w-4 mr-2" />
//             {initialData ? "Update Script" : "Save Script"}
//           </button>
//         </div>
//       </form>

//       {/* Send Email Button */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           onClick={handleShareViaEmail}
//           className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
//         >
//           <svg
//             className="w-5 h-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//           Share via Email
//         </button>
//       </div>

//       {/* Save Confirmation Popup */}
//       {showSavedPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg
//                   className="h-6 w-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-4">
//                 <h3 className="text-lg font-medium text-gray-900">
//                   Script Saved!
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   Your changes have been successfully saved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import {
  ChevronDownIcon,
  DownloadIcon,
  SaveIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  FiCode,
  FiFileText,
  FiDatabase,
  FiTag,
  FiFolder,
} from "react-icons/fi";
import { useAuth } from "../../services/auth";
import Editor from "@monaco-editor/react";

export default function NoteEditor({ initialData, onSave }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      content: "",
      scriptType: "business_rule",
      scriptSubType: "before",
      project: "",
      tags: [],
    }
  );
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-light");
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const scriptTypes = [
    "business_rule",
    "script_include",
    "client_script",
    "scheduled_job",
    "ui_action",
    "email_template",
    "ui_script",
    "widget",
    "fix_script",
    "email_script",
    "background_script",
  ];

  const scriptSubTypes = {
    business_rule: [
      { value: "before", label: "Before" },
      { value: "after", label: "After" },
      { value: "async_after", label: "Async" },
      { value: "display", label: "Display" },
    ],
    client_script: [
      { value: "onLoad", label: "OnLoad" },
      { value: "onChange", label: "OnChange" },
      { value: "onSubmit", label: "OnSubmit" },
      { value: "onCellEdit", label: "OnCellEdit" },
    ],
    script_include: [],
    scheduled_job: [],
    ui_action: [],
    email_template: [],
    ui_script: [],
    widget: [],
    fix_script: [],
    email_script: [],
    background_script: [],
  };

  // ServiceNow specific auto-completion items
  const getScriptSuggestions = () => {
    const commonSuggestions = [
      // Functions
      { label: 'function onChange()', kind: monacoRef.current.languages.CompletionItemKind.Function, documentation: 'OnChange client script function', insertText: 'function onChange(control, oldValue, newValue, isLoading) {\n\t${1}\n}' },
      { label: 'function onSubmit()', kind: monacoRef.current.languages.CompletionItemKind.Function, documentation: 'OnSubmit client script function', insertText: 'function onSubmit() {\n\t${1}\n}' },
      { label: 'function onLoad()', kind: monacoRef.current.languages.CompletionItemKind.Function, documentation: 'OnLoad client script function', insertText: 'function onLoad() {\n\t${1}\n}' },
      
      // ServiceNow API
      { label: 'gs', kind: monacoRef.current.languages.CompletionItemKind.Variable, documentation: 'GlideSystem (gs) API', insertText: 'gs' },
      { label: 'current', kind: monacoRef.current.languages.CompletionItemKind.Variable, documentation: 'Current GlideRecord', insertText: 'current' },
      { label: 'previous', kind: monacoRef.current.languages.CompletionItemKind.Variable, documentation: 'Previous GlideRecord', insertText: 'previous' },
      { label: 'GlideRecord', kind: monacoRef.current.languages.CompletionItemKind.Class, documentation: 'GlideRecord constructor', insertText: 'new GlideRecord(\'${1:table_name}\')' },
      
      // Common methods
      { label: 'gs.addInfoMessage()', kind: monacoRef.current.languages.CompletionItemKind.Method, documentation: 'Add info message', insertText: 'gs.addInfoMessage(\'${1:message}\')' },
      { label: 'gs.log()', kind: monacoRef.current.languages.CompletionItemKind.Method, documentation: 'Log message to system log', insertText: 'gs.log(\'${1:message}\')' },
      { label: 'current.getValue()', kind: monacoRef.current.languages.CompletionItemKind.Method, documentation: 'Get field value', insertText: 'current.getValue(\'${1:field_name}\')' },
      
      // Control statements
      { label: 'if', kind: monacoRef.current.languages.CompletionItemKind.Keyword, documentation: 'If statement', insertText: 'if (${1:condition}) {\n\t${2}\n}' },
      { label: 'for', kind: monacoRef.current.languages.CompletionItemKind.Keyword, documentation: 'For loop', insertText: 'for (var ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3}\n}' },
      { label: 'while', kind: monacoRef.current.languages.CompletionItemKind.Keyword, documentation: 'While loop', insertText: 'while (${1:condition}) {\n\t${2}\n}' },
      
      // Comments
      { label: '//', kind: monacoRef.current.languages.CompletionItemKind.Snippet, documentation: 'Single line comment', insertText: '// ${1}' },
      { label: '/* */', kind: monacoRef.current.languages.CompletionItemKind.Snippet, documentation: 'Multi-line comment', insertText: '/*\n * ${1}\n */' }
    ];

    return commonSuggestions;
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Configure editor options
    editor.updateOptions({
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      wordWrap: "on",
      automaticLayout: true,
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      parameterHints: { enabled: true },
      formatOnPaste: true,
      formatOnType: true,
      renderWhitespace: "selection",
      tabSize: 2,
      insertSpaces: true,
      autoIndent: "full",
      folding: true,
      lineNumbers: "on",
      glyphMargin: true,
      scrollbar: {
        vertical: "auto",
        horizontal: "auto",
      },
    });

    // Add custom keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      document.getElementById("save-button").click();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, () => {
      const selection = editor.getSelection();
      const text = editor.getModel().getValueInRange(selection);
      editor.executeEdits("", [
        {
          range: selection,
          text: `**${text}**`,
          forceMoveMarkers: true
        }
      ]);
    });

    // Register custom completion provider for JavaScript
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model, position) => {
        const suggestions = getScriptSuggestions();
        return { suggestions };
      },
      triggerCharacters: ['.', '(']
    });

    // Add bold formatting action to context menu
    editor.addAction({
      id: 'format-bold',
      label: 'Format Bold',
      contextMenuGroupId: 'formatting',
      contextMenuOrder: 1,
      run: () => {
        const selection = editor.getSelection();
        const text = editor.getModel().getValueInRange(selection);
        editor.executeEdits("", [
          {
            range: selection,
            text: `**${text}**`,
            forceMoveMarkers: true
          }
        ]);
      }
    });
  };

  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleDownload = (format = "txt") => {
    if (!formData.content) return;

    let content, extension;

    switch (format) {
      case "json":
        content = JSON.stringify(
          {
            title: formData.title,
            content: formData.content,
            type: formData.scriptType,
            subType: formData.scriptSubType,
            project: formData.project,
            tags: formData.tags,
            created: new Date().toISOString(),
          },
          null,
          2
        );
        extension = "json";
        break;
      case "xml":
        content = `<?xml version="1.0" encoding="UTF-8"?>
<servicenow-script>
  <metadata>
    <title>${formData.title}</title>
    <type>${formData.scriptType}</type>
    ${formData.scriptSubType ? `<subtype>${formData.scriptSubType}</subtype>` : ''}
    <project>${formData.project}</project>
    <created>${new Date().toISOString()}</created>
  </metadata>
  <content><![CDATA[${formData.content}]]></content>
</servicenow-script>`;
        extension = "xml";
        break;
      default: // txt
        content = formData.content;
        extension = "txt";
    }

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.title.replace(/[^\w]/g, "_")}_${
      formData.scriptType
    }.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShareViaEmail = () => {
    const subject = `ServiceNow Script: ${formData.title}`;
    const body = `Here's the ServiceNow script you requested:

Script Title: ${formData.title}
Script Type: ${formData.scriptType.replace(/_/g, ' ').toUpperCase()}
${formData.scriptSubType ? `Script Sub-Type: ${formData.scriptSubType.replace(/_/g, ' ').toUpperCase()}\n` : ''}
${formData.project ? `Project: ${formData.project}` : ''}

Script Content:
${formData.content}

---
Sent from ServiceNow Script Manager`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleScriptTypeChange = (e) => {
    const newType = e.target.value;
    setFormData({ 
      ...formData, 
      scriptType: newType,
      scriptSubType: scriptSubTypes[newType]?.length > 0 ? scriptSubTypes[newType][0].value : ''
    });
  };

  // Set up syntax highlighting based on script type
  const getEditorLanguage = () => {
    switch(formData.scriptType) {
      case 'business_rule':
      case 'script_include':
      case 'client_script':
      case 'scheduled_job':
      case 'ui_action':
      case 'ui_script':
      case 'fix_script':
      case 'background_script':
        return 'javascript';
      case 'email_template':
      case 'email_script':
        return 'html';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center pb-6 border-b border-orange-200">
        <div>
          <p className="text-sm text-gray-500 mt-1">
            {initialData
              ? "Update your existing script"
              : "Start writing your ServiceNow script"}
          </p>
        </div>

        {formData.content && (
          <div className="relative">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-lg"
            >
              <DownloadIcon className="h-5 w-5 mr-2" />
              Export
              <ChevronDownIcon className="h-4 w-4 ml-2" />
            </button>

            {showDownloadMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 border border-orange-100 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => {
                      handleDownload("txt");
                      setShowDownloadMenu(false);
                    }}
                    className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
                  >
                    <FiFileText className="text-orange-500 mr-3" />
                    <div>
                      <div className="font-medium">Text File</div>
                      <div className="text-xs text-gray-500">.txt format</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      handleDownload("json");
                      setShowDownloadMenu(false);
                    }}
                    className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
                  >
                    <FiDatabase className="text-orange-500 mr-3" />
                    <div>
                      <div className="font-medium">JSON File</div>
                      <div className="text-xs text-gray-500">.json format</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      handleDownload("xml");
                      setShowDownloadMenu(false);
                    }}
                    className="flex w-full px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 items-center transition-colors"
                  >
                    <FiCode className="text-orange-500 mr-3" />
                    <div>
                      <div className="font-medium">XML File</div>
                      <div className="text-xs text-gray-500">.xml format</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(formData);
          setShowSavedPopup(true);
          setTimeout(() => setShowSavedPopup(false), 1000);
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Title Field */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <FiFileText className="text-orange-500 mr-2" />
              Script Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              required
              placeholder="e.g., Incident Priority Business Rule"
            />
          </div>

          {/* Script Type Field */}
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <label
              htmlFor="scriptType"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <FiCode className="text-orange-500 mr-2" />
              Script Type *
            </label>
            <div className="relative">
              <select
                id="scriptType"
                value={formData.scriptType}
                onChange={handleScriptTypeChange}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
                required
              >
                {scriptTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Script Sub-Type Field (conditionally rendered) */}
        {scriptSubTypes[formData.scriptType]?.length > 0 && (
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <label
              htmlFor="scriptSubType"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <FiCode className="text-orange-500 mr-2" />
              {formData.scriptType.replace(/_/g, ' ').toUpperCase()} Type *
            </label>
            <div className="relative">
              <select
                id="scriptSubType"
                value={formData.scriptSubType}
                onChange={(e) =>
                  setFormData({ ...formData, scriptSubType: e.target.value })
                }
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none transition-all"
                required
              >
                {scriptSubTypes[formData.scriptType].map((subType) => (
                  <option key={subType.value} value={subType.value}>
                    {subType.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Project Field */}
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <label
            htmlFor="project"
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
          >
            <FiFolder className="text-orange-500 mr-2" />
            Project Name
          </label>
          <input
            id="project"
            type="text"
            value={formData.project}
            onChange={(e) =>
              setFormData({ ...formData, project: e.target.value })
            }
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            placeholder="e.g., HR Service Portal Implementation"
          />
        </div>

        {/* Content Field */}
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <FiCode className="text-orange-500 mr-2" />
              Script Content *
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1 bg-white"
              >
                <option value="vs-light">Light Theme</option>
                <option value="vs-dark">Dark Theme</option>
                <option value="hc-black">High Contrast</option>
              </select>
            </div>
          </div>
          
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <Editor
              height="400px"
              language={getEditorLanguage()}
              theme={editorTheme}
              value={formData.content}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: true },
                scrollBeyondLastLine: false,
                fontSize: 14,
                wordWrap: "on",
                automaticLayout: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
                parameterHints: { enabled: true },
                formatOnPaste: true,
                formatOnType: true,
                renderWhitespace: "selection",
                tabSize: 2,
                insertSpaces: true,
                autoIndent: "full",
                folding: true,
                lineNumbers: "on",
                glyphMargin: true,
                scrollbar: {
                  vertical: "auto",
                  horizontal: "auto",
                },
                // Enable rich text editing capabilities
                fontLigatures: true,
                bracketPairColorization: { enabled: true },
                guides: { indentation: true },
                hover: { enabled: true },
                lightbulb: { enabled: true },
                matchBrackets: "always",
                occurrencesHighlight: true,
                renderControlCharacters: true,
                renderFinalNewline: true,
                renderLineHighlight: "all",
                renderValidationDecorations: "on",
                roundedSelection: true,
                rulers: [],
                selectionClipboard: true,
                selectionHighlight: true,
                showFoldingControls: "mouseover",
                showUnused: true,
                smoothScrolling: true,
                snippetSuggestions: "top",
                stickyScroll: { enabled: true },
                suggestSelection: "first",
                wordBasedSuggestions: true,
                wordSeparators: "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?",
                wordWrapBreakAfterCharacters: "\t})]?|&,;",
                wordWrapBreakBeforeCharacters: "{([+=",
                wrappingIndent: "same",
              }}
            />
          </div>
          <div className="mt-2 text-xs text-gray-500">
            <p>Tip: Use <strong>Ctrl+B</strong> to bold selected text or right-click for formatting options</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-orange-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex items-center px-5 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
          >
            <XIcon className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            id="save-button"
            type="submit"
            className="flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all"
          >
            <SaveIcon className="h-4 w-4 mr-2" />
            {initialData ? "Update Script" : "Save Script"}
          </button>
        </div>
      </form>

      {/* Send Email Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleShareViaEmail}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Share via Email
        </button>
      </div>

      {/* Save Confirmation Popup */}
      {showSavedPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl border border-green-200 animate-pop-in">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Script Saved!
                </h3>
                <p className="text-sm text-gray-500">
                  Your changes have been successfully saved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}