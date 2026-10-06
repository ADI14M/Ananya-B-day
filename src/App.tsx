import { useState, useEffect } from 'react'
import { Loading } from './components/Loading'
import { Hero } from './components/Hero'
import { MusicControl } from './components/MusicControl'
import { MainCharacter } from './components/MainCharacter'
import { Timeline } from './components/Timeline'
import { PhotoGallery } from './components/PhotoGallery'
import { ThingsWeKnow } from './components/ThingsWeKnow'
import { FamilyMessages } from './components/FamilyMessages'
import { PhotoMontage } from './components/PhotoMontage'
import { Stats } from './components/Stats'
import { FutureGen } from './components/FutureGen'
import { BirthdayReveal } from './components/BirthdayReveal'
import { FinalMessage } from './components/FinalMessage'
import { SecretPage } from './components/Secret'
import { Navigation } from './components/Navigation'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasEntered, setHasEntered] = useState(false)
  const [isSecretRoute, setIsSecretRoute] = useState(false)

  useEffect(() => {
    // Simple router
    const handleLocationChange = () => {
      setIsSecretRoute(window.location.pathname === '/secret');
    };
    
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    
    // Lock scroll when loading or before entering
    if (isLoading || !hasEntered) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.body.classList.remove('no-scroll');
    };
  }, [isLoading, hasEntered]);

  if (isSecretRoute) {
    return <SecretPage />
  }

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <>
          <MusicControl isVisible={hasEntered} />
          <Navigation isVisible={hasEntered} />
          
          <main>
            <Hero onEnter={() => setHasEntered(true)} hasEntered={hasEntered} />
            
            {hasEntered && (
              <>
                <MainCharacter />
                <Timeline />
                <PhotoGallery />
                <ThingsWeKnow />
                <FamilyMessages />
                <PhotoMontage />
                <Stats />
                <FutureGen />
                <BirthdayReveal />
                <FinalMessage />
              </>
            )}
          </main>
        </>
      )}
    </div>
  )
}

export default App
