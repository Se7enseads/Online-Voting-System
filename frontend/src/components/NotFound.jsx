import '@dotlottie/player-component';

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <dotlottie-player
        autoplay
        background="transparent"
        direction="1"
        loop
        mode="normal"
        speed="1"
        src="https://lottie.host/b071e8b2-2784-45ea-9773-39da3abc0fbc/lWsktSkePO.lottie"
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}

export default NotFound;
