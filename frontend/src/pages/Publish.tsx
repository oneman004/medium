import { useState, ChangeEvent } from 'react'
import { Appbar } from '../components/Appbar'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'

export default function Publish() {
    const navigate = useNavigate();
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handlePublish = async () => {
    // Here you would typically send the data to a server
    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
        title,
        content
    },{
        headers: {
            Authorization: localStorage.getItem("token")
        }
    });
    navigate(`/blog/${response.data.id}`)
    console.log('Publishing:', { title, content })
    setIsPublished(true)
    // Reset the published state after 3 seconds
    setTimeout(() => setIsPublished(false), 3000)
  }

  return (<div>
    <Appbar/>
    <div className="max-w-3xl mx-auto p-4 space-y-4 mt-8">
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full text-4xl font-bold placeholder-gray-300 focus:outline-none"
          aria-label="Title"
        />
        <div className="h-px bg-gray-200" />
      </div>
      <div className="relative">
        <textarea
          placeholder="Tell your story..."
          value={content}
          onChange={handleContentChange}
          className="w-full min-h-[200px] text-xl leading-relaxed placeholder-gray-300 resize-none focus:outline-none"
          aria-label="Content"
        />
        <div className="absolute bottom-2 right-2 text-sm text-gray-400">
          {content.length} characters
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handlePublish}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          aria-label="Publish story"
        >
          Publish
        </button>
      </div>
      {isPublished && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center">
          Your story has been published!
        </div>
      )}
    </div>
    </div>
  )
}