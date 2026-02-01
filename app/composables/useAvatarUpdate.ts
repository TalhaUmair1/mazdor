// Simple event emitter for avatar updates
const avatarUpdateEvent = ref(0)

export function useAvatarUpdate() {
  const triggerAvatarUpdate = () => {
    avatarUpdateEvent.value++
    console.log('Avatar update triggered:', avatarUpdateEvent.value)
  }
  
  const watchAvatarUpdate = () => {
    return readonly(avatarUpdateEvent)
  }
  
  return {
    triggerAvatarUpdate,
    watchAvatarUpdate
  }
}