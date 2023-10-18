import '@dotlottie/player-component';

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center dark:bg-slate-900">
      <dotlottie-player
        autoplay
        background="transparent"
        direction="1"
        loop
        mode="normal"
        speed="1"
        src="/images/404.lottie"
        style={{ height: '700px', width: '700px' }}
      />
    </div>
  );
}

export default NotFound;
