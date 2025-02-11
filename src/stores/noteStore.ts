import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Note } from '@/interfaces/Note.ts'

export const useNoteStore = defineStore('note', () => {
    const notesList = JSON.parse(localStorage.getItem('notes') ?? '[]');
    const notes = ref<Note[]>(notesList);
    const loadingNotes = ref(false);

    const filteredNotes = ref<Note[]>([...notes.value]);
    const notesCount = computed(() => notes.value.length);

    const fetchNotes = (tagId?: string) => {
        if (tagId) {
            return notes.value.filter((note) =>
                note.tags.some((tag) => tag.id === tagId)
            );
        }
        return notes.value;
    };

    const addNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
        const newNote = {
            ...note,
            id: crypto.randomUUID(),
            createdAt: new Date(),
        }
        notes.value = [...notes.value, newNote];
    };

    const deleteNote = (id: string) => {
        notes.value = notes.value.filter((note) => note.id !== id);
    };

    const updateNote = (updatedNote: Note) => {
        const index = notes.value.findIndex(note => note.id === updatedNote.id);
        if (index !== -1) {
            notes.value[index] = { ...updatedNote };  // Actualiza la nota con los nuevos datos
        }
    };


    const searchNotesByTitle = (title: string) => {
        filteredNotes.value = notes.value.filter((note) =>
            note.title.toLowerCase().includes(title.toLowerCase())
        );
    };

    const orderNotesByDate = (orderAsc: boolean) => {
        filteredNotes.value = filteredNotes.value.sort((a, b) => {
            if (orderAsc) {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }

    watch(notes, (newNotes) => {
        localStorage.setItem('notes', JSON.stringify(newNotes));
        filteredNotes.value = [...newNotes];
    }, { deep: true });


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
        filteredNotes
    }
});