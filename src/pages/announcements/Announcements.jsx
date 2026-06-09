import React from 'react'
import { useState } from 'react'
import { Table, TableBody, TableRow, TableHead, TableCell, TableHeader } from '@/components/ui/table'
import { Trash2, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'


const Announcements = () => {

  const [announcements, setAnnouncements] = useState(() => {
    return JSON.parse(localStorage.getItem('announcements') || '[]')
  })

  const getStatusStyle = (type) => {
    if (type === 'info') return "bg-green-100 text-green-700"
    if (type === 'warning') return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }


  const [editAnnouncement, setEditAnnouncement] = useState(null)

  const deleteAnnouncement = (id) => {
    const updated = announcements.filter(a => a.id !== id)
    setAnnouncements(updated)
    localStorage.setItem('announcements', JSON.stringify(updated))
  }

  const saveEdit = () => {
    const updated = announcements.map(a => a.id === editAnnouncement.id ? editAnnouncement : a)
    setAnnouncements(updated)
    localStorage.setItem('announcements', JSON.stringify(updated))
    setEditAnnouncement(null)
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
            <TableRow key={announcements.id}>
              <TableCell>{announcements.title}</TableCell>
              <TableCell>{announcements.message}</TableCell>
              <TableCell>{announcements.date}</TableCell>
              <TableCell>
                <span className={`${getStatusStyle(announcements.type)} rounded-full text-sm px-2 py-1`}>
                  {announcements.type}
                </span>
              </TableCell>
              <TableCell>
                <Button size='sm' variant='ghost' onClick={() => setEditAnnouncement(announcements)}>
                  <Pencil size={14} />
                </Button>
                <Button size='sm' variant='ghost' onClick={() => deleteAnnouncement(announcements.id)}>
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
          <Input type="date" value={editAnnouncement?.date || ""} onChange={e => setEditAnnouncement({ ...editAnnouncement, date: e.target.value })} />
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