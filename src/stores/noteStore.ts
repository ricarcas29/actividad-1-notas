import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Note } from '@/interfaces/Note.ts'

export const useNoteStore = defineStore('note', () => {
  //Aqui no hace falta una reasignación de las notas ya que obtienes las notas del localStorage
  // const notesList = JSON.parse(localStorage.getItem('notes') ?? '[]');
  // const notes = ref<Note[]>(notesList);

  //Aqui se obtienen las notas del localStorage y se convierte a un array de notas
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem('notes') ?? '[]'))

  const loadingNotes = ref(false)

  const filteredNotes = ref<Note[]>([...notes.value])
  const notesCount = computed(() => filteredNotes.value.length)

  const fetchNotes = (tagId?: string) => {
    if (tagId) {
      return notes.value.filter((note) => note.tags.some((tag) => tag.id === tagId))
    }
    return notes.value
  }

  const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    const newNote = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }
    notes.value.push(newNote)
  }

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter((note) => note.id !== id)
  }

  const updateNote = (updatedNote: Omit<Note, 'createdAt'>) => {
    const index = notes.value.findIndex((note) => note.id === updatedNote.id)
    if (index !== -1) {
      notes.value[index] = {
        ...updatedNote,
        createdAt: notes.value[index].createdAt,
      }
    }
  }

  const deleteNotesByTag = (tagId?: string) => {
    if (!tagId) {
      notes.value = []
    } else {
      notes.value = notes.value.filter((note) => !note.tags.some((tag) => tag.id === tagId))
    }
    filterNotesByTag(tagId)
  }

  const searchNotesByTitle = (title: string) => {
    filteredNotes.value = notes.value.filter((note) =>
      note.title.toLowerCase().includes(title.toLowerCase()),
    )
  }

  const orderNotesByDate = (orderAsc: boolean) => {
    filteredNotes.value = filteredNotes.value.sort((a, b) => {
      if (orderAsc) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  const filterNotesByTag = (tagId?: string) => {
    console.log(tagId);
    if (!tagId) {
      filteredNotes.value = [...notes.value]
    } else {
      filteredNotes.value = notes.value.filter((note) => note.tags.some((tag) => tag.id === tagId))
    }
  }

  watch(
    notes,
    (newNotes) => {
      localStorage.setItem('notes', JSON.stringify(newNotes))
    },
    { deep: true },
  )

  return {
    notes,
    notesCount,
    loadingNotes,
    addNote,
    deleteNote,
    updateNote,
    searchNotesByTitle,
    fetchNotes,
    orderNotesByDate,
    filteredNotes,
    filterNotesByTag,
    deleteNotesByTag,
  }
})
