import React from 'react'
import { useState, useEffect } from 'react'
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getAnnouncements, updateAnnouncement, deleteAnnouncement as deleteAnnouncementApi } from '@/services/announcement.service'


const Announcements = () => {

  const [announcements, setAnnouncements] = useState([])
  

  const fetchAnnouncements = async () => {
  try {
    const data = await getAnnouncements()
    setAnnouncements(data || [])
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const getStatusStyle = (type) => {
    if (type === 'info') return "bg-green-100 text-green-700"
    if (type === 'warning') return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }


  const [editAnnouncement, setEditAnnouncement] = useState(null)

  const handleDelete = async (id) => {
  try {
    await deleteAnnouncementApi(id)
    fetchAnnouncements()
  } catch (error) {
    console.log(error)
  }
}

  const saveEdit = async () => {
  try {
    await updateAnnouncement(editAnnouncement._id, editAnnouncement)
    setEditAnnouncement(null)
    fetchAnnouncements()
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {announcements.map((announcements) => (
            <TableRow key={announcements._id}>
              <TableCell>{announcements.title}</TableCell>
              <TableCell>{announcements.message}</TableCell>
              <TableCell>{new Date(announcements.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <span className={`${getStatusStyle(announcements.type)} rounded-full text-sm px-2 py-1`}>
                  {announcements.type}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => setEditAnnouncement(announcements)}>
                  <Pencil size={14} />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => handleDelete(announcements._id)}>
                  <Trash2 size={14} className='text-red-500' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editAnnouncement !== null} onOpenChange={() => setEditAnnouncement(null)}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          <Input placeholder="Title" value={editAnnouncement?.title || ""} onChange={e => setEditAnnouncement({ ...editAnnouncement, title: e.target.value })} />
          <Input placeholder="Message" value={editAnnouncement?.message || ""} onChange={e => setEditAnnouncement({ ...editAnnouncement, message: e.target.value })} />
          <Input type="date" value={editAnnouncement?.date ? editAnnouncement.date.slice(0, 10) : ""} onChange={e => setEditAnnouncement({ ...editAnnouncement, date: e.target.value })} />
          <select value={editAnnouncement?.type || ""} onChange={e => setEditAnnouncement({ ...editAnnouncement, type: e.target.value })} className='border rounded-xl p-2 text-sm'>
            <option value='info'>Info</option>
            <option value='warning'>Warning</option>
            <option value='important'>Important</option>
          </select>
          <Button onClick={saveEdit}>Save</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Announcements