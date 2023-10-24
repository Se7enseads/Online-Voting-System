import '@dotlottie/player-component';

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-slate-900">
      <dotlottie-player
        autoplay
        background="transparent"
        direction="1"
        hover
        loop
        mode="normal"
        speed="1"
        src="/images/loading.lottie"
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}

export default Loading;
