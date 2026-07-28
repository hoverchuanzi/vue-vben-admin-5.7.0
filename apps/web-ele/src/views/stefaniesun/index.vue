<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({ name: 'StefanieSun' });

interface Track {
  appleUrl: string;
  duration: string;
  name: string;
  previewUrl: string;
}

interface Album {
  accent: string;
  artwork: string;
  description: string;
  id: string;
  title: string;
  tracks: Track[];
  year: string;
}

const albums: Album[] = [
  {
    accent: '#d9f467',
    artwork:
      'https://is1-ssl.mzstatic.com/image/thumb/Music/0f/99/a7/mzi.zsimusvk.jpg/600x600bb.jpg',
    description: '在清醒与勇敢之间，听见刚刚好的幸福。',
    id: 'happiness',
    title: '我要的幸福',
    tracks: [
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E5%BC%80%E5%A7%8B%E6%87%82%E4%BA%86/298837646?i=298837675',
        duration: '04:31',
        name: '开始懂了',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9f/7f/b3/9f7fb3f8-602b-5b34-d5fa-0690b731b044/mzaf_11696553960136214494.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E6%88%91%E8%A6%81%E7%9A%84%E5%B9%B8%E7%A6%8F/298837646?i=298837663',
        duration: '03:36',
        name: '我要的幸福',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/89/82/62/898262fa-8d5d-31bd-b354-a0303635122c/mzaf_5092409879945871227.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E7%9B%B8%E4%BF%A1/298837646?i=298837711',
        duration: '04:32',
        name: '相信',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/34/8d/69/348d69ca-b207-b118-54c3-c63b9c753908/mzaf_348850115823538115.plus.aac.p.m4a',
      },
    ],
    year: '2000',
  },
  {
    accent: '#ff7b54',
    artwork:
      'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/30/62/78/306278c0-b42a-2325-a641-758ccd7f4c7e/190295864422.jpg/600x600bb.jpg',
    description: '迎着风奔跑，青春永远有一束绿色的光。',
    id: 'kite',
    title: '风筝',
    tracks: [
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E7%BB%BF%E5%85%89-remastered/1183070065?i=1183070135',
        duration: '03:15',
        name: '绿光',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/64/5d/75/645d75c9-f5dd-7414-0294-6534d2367580/mzaf_16744745687212853318.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E9%A3%8E%E7%AD%9D-remastered/1183070065?i=1183070136',
        duration: '04:37',
        name: '风筝',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/00/81/e6/0081e66f-ed83-5ccc-6641-8f9700e9ac9f/mzaf_15489308767444226571.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E9%80%83%E4%BA%A1-remastered/1183070065?i=1183070138',
        duration: '04:46',
        name: '逃亡',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/f4/4b/e0/f44be00f-75f8-a2b6-b0ad-31ff5ee42f28/mzaf_6340781714475625444.plus.aac.p.m4a',
      },
    ],
    year: '2001',
  },
  {
    accent: '#77c7ff',
    artwork:
      'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/24/fc/1d/24fc1d3e-b37f-968f-3d21-880edc8f8d79/mzi.ybwydvjn.jpg/600x600bb.jpg',
    description: '未完成，恰好是继续往前走的理由。',
    id: 'unfinished',
    title: '未完成',
    tracks: [
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E6%88%91%E4%B8%8D%E9%9A%BE%E8%BF%87/255920420?i=255921025',
        duration: '05:20',
        name: '我不难过',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8b/52/36/8b523674-3ffb-213d-dd2a-7db2fc4a9c27/mzaf_14799276889319854992.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E7%A5%9E%E5%A5%87/255920420?i=255920667',
        duration: '04:23',
        name: '神奇',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f0/60/8f/f0608f50-abde-1cc0-b3cf-fcf65e9b918a/mzaf_10664661196393213102.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E4%BC%91%E6%AD%A2%E7%AC%A6/255920420?i=255922037',
        duration: '03:49',
        name: '休止符',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/14/00/97/140097ea-5180-b855-885d-c242244a912b/mzaf_4575462876577999092.plus.aac.p.m4a',
      },
    ],
    year: '2003',
  },
  {
    accent: '#f2aa69',
    artwork:
      'https://is1-ssl.mzstatic.com/image/thumb/Music/94/d7/fc/mzi.itefxkul.jpg/600x600bb.jpg',
    description: '更真实、更自由，也更接近她自己的名字。',
    id: 'stefanie',
    title: 'Stefanie',
    tracks: [
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E6%88%91%E4%B9%9F%E5%BE%88%E6%83%B3%E4%BB%96/255921035?i=255921424',
        duration: '04:17',
        name: '我也很想他',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/48/bd/a3/48bda342-1e0a-5b8b-010c-77ccb9995ce0/mzaf_16559461176901919738.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E5%90%8C%E7%B1%BB/255921035?i=255921849',
        duration: '03:33',
        name: '同类',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/d0/63/57/d06357a0-27da-ea90-135e-46c23876b6c9/mzaf_4392426250313621038.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E6%88%91%E7%9A%84%E7%88%B1/255921035?i=255921217',
        duration: '04:21',
        name: '我的爱',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b3/0f/eb/b30febb5-f2b1-8d8c-2da6-cf074bec14c7/mzaf_930420320063763810.plus.aac.p.m4a',
      },
    ],
    year: '2004',
  },
  {
    accent: '#ffcd55',
    artwork:
      'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/39/8e/7d/398e7d64-1877-03ab-17cb-460943429bc0/825646246939.jpg/600x600bb.jpg',
    description: '穿过逆光，才知道坚定本身就是答案。',
    id: 'against-light',
    title: '逆光',
    tracks: [
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E6%88%91%E6%80%80%E5%BF%B5%E7%9A%84/905226289?i=905226305',
        duration: '04:49',
        name: '我怀念的',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9e/06/17/9e061768-b9a1-bd04-da3c-45744fb3282d/mzaf_13127211952509430510.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E9%80%86%E5%85%89/905226289?i=905226302',
        duration: '04:54',
        name: '逆光',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/1b/c2/9c/1bc29cb8-9f0e-9791-9027-f5946de0db88/mzaf_3904807340238202496.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E5%92%95%E5%8F%BD%E5%92%95%E5%8F%BD/905226289?i=905226304',
        duration: '04:33',
        name: '咕叽咕叽',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ec/a0/2a/eca02adb-a5f2-7924-5e8c-96420fa8db8c/mzaf_6555048704517805623.plus.aac.p.m4a',
      },
    ],
    year: '2007',
  },
  {
    accent: '#b9a8ff',
    artwork:
      'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/81/dc/36/81dc3656-ae44-4641-7aa4-485e48fae68b/14UMGIM00262.rgb.jpg/600x600bb.jpg',
    description: '在浩瀚的孤星里，仍然可以准确地找到你。',
    id: 'kepler',
    title: '克卜勒',
    tracks: [
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E5%85%8B%E5%8D%9C%E5%8B%92/1443147411?i=1443147414',
        duration: '04:09',
        name: '克卜勒',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d3/90/ed/d390ed74-de75-742c-5952-207a43a36521/mzaf_1914051124016254712.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E5%B0%9A%E5%A5%BD%E7%9A%84%E9%9D%92%E6%98%A5/1443147411?i=1443147422',
        duration: '04:25',
        name: '尚好的青春',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c9/dc/de/c9dcde1e-ec51-aa9b-4912-9b9a9fe8ee03/mzaf_13052378882230983106.plus.aac.p.m4a',
      },
      {
        appleUrl:
          'https://music.apple.com/cn/album/%E5%A4%A9%E4%BD%BF%E7%9A%84%E6%8C%87%E7%BA%B9/1443147411?i=1443147423',
        duration: '04:06',
        name: '天使的指纹',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/a4/d1/53a4d133-ee9e-5c0c-b463-bf692f6935bf/mzaf_14447005015290671917.plus.aac.p.m4a',
      },
    ],
    year: '2014',
  },
];

const audioRef = ref<HTMLAudioElement>();
const pageRef = ref<HTMLElement>();
const selectedAlbumId = ref(albums[4]?.id ?? '');
const currentAlbumId = ref(albums[4]?.id ?? '');
const currentTrackIndex = ref(0);
const isPlaying = ref(false);
const currentTime = ref(0);
const previewDuration = ref(30);
const volume = ref(0.75);
const playerLeft = ref(0);
let pageResizeObserver: ResizeObserver | undefined;

function getRequiredItem<T>(item: T | undefined, message: string): T {
  if (item === undefined) {
    throw new Error(message);
  }
  return item;
}

const defaultAlbum = getRequiredItem(albums[0], '至少需要配置一张专辑');

const selectedAlbum = computed(
  () =>
    albums.find((album) => album.id === selectedAlbumId.value) ?? defaultAlbum,
);
const currentAlbum = computed(
  () =>
    albums.find((album) => album.id === currentAlbumId.value) ?? defaultAlbum,
);
const currentTrack = computed(() =>
  getRequiredItem(
    currentAlbum.value.tracks[currentTrackIndex.value],
    '当前专辑缺少试听曲目',
  ),
);
const progress = computed(() =>
  previewDuration.value
    ? Math.min((currentTime.value / previewDuration.value) * 100, 100)
    : 0,
);
const allTracks = computed(() =>
  albums.flatMap((album) =>
    album.tracks.map((track, index) => ({ album, index, track })),
  ),
);

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00';
  return `${Math.floor(value / 60)}:${Math.floor(value % 60)
    .toString()
    .padStart(2, '0')}`;
}

async function playTrack(album: Album, index: number) {
  const sameTrack =
    currentAlbumId.value === album.id && currentTrackIndex.value === index;

  if (sameTrack && isPlaying.value) {
    audioRef.value?.pause();
    return;
  }

  if (!sameTrack) {
    currentAlbumId.value = album.id;
    currentTrackIndex.value = index;
    currentTime.value = 0;
    await nextTick();
    audioRef.value?.load();
  }

  try {
    await audioRef.value?.play();
  } catch {
    isPlaying.value = false;
  }
}

async function togglePlay() {
  if (isPlaying.value) {
    audioRef.value?.pause();
  } else {
    await playTrack(currentAlbum.value, currentTrackIndex.value);
  }
}

async function playRandom() {
  const choices = allTracks.value.filter(
    ({ album, index }) =>
      album.id !== currentAlbumId.value || index !== currentTrackIndex.value,
  );
  const choice = choices[Math.floor(Math.random() * choices.length)];
  if (!choice) return;
  selectedAlbumId.value = choice.album.id;
  await playTrack(choice.album, choice.index);
}

async function playAdjacent(direction: -1 | 1) {
  const currentIndex = allTracks.value.findIndex(
    ({ album, index }) =>
      album.id === currentAlbumId.value && index === currentTrackIndex.value,
  );
  const nextIndex =
    (currentIndex + direction + allTracks.value.length) %
    allTracks.value.length;
  const next = allTracks.value[nextIndex];
  if (next) {
    selectedAlbumId.value = next.album.id;
    await playTrack(next.album, next.index);
  }
}

function seek(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  if (audioRef.value) audioRef.value.currentTime = value;
}

function changeVolume(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  volume.value = value;
  if (audioRef.value) audioRef.value.volume = value;
}

function updateAudioState() {
  if (!audioRef.value) return;
  currentTime.value = audioRef.value.currentTime;
  previewDuration.value = Number.isFinite(audioRef.value.duration)
    ? audioRef.value.duration
    : 30;
}

function handleEnded() {
  void playRandom();
}

onMounted(() => {
  const updatePlayerPosition = () => {
    playerLeft.value = pageRef.value?.getBoundingClientRect().left ?? 0;
  };

  updatePlayerPosition();
  pageResizeObserver = new ResizeObserver(updatePlayerPosition);
  if (pageRef.value) pageResizeObserver.observe(pageRef.value);
  window.addEventListener('resize', updatePlayerPosition);

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePlayerPosition);
  });
});

onBeforeUnmount(() => {
  audioRef.value?.pause();
  pageResizeObserver?.disconnect();
});
</script>

<template>
  <main
    ref="pageRef"
    class="music-page"
    :style="{ '--accent': selectedAlbum.accent }"
  >
    <section class="hero">
      <div class="hero-orbit orbit-one"></div>
      <div class="hero-orbit orbit-two"></div>
      <div class="hero-copy">
        <div class="eyebrow"><span></span> STEFANIE SUN · 试听档案</div>
        <h1>在歌里，<br /><em>遇见</em> 孙燕姿。</h1>
        <p>从《我要的幸福》到《克卜勒》，把那些陪我们长大的声音，再听一遍。</p>
        <div class="hero-actions">
          <button class="primary-button" type="button" @click="playRandom">
            <span class="play-symbol">▶</span>
            随机听一首
          </button>
          <a class="text-button" href="#albums">浏览专辑 <span>↓</span></a>
        </div>
        <div class="hero-stats">
          <div><strong>06</strong><span>精选专辑</span></div>
          <div><strong>18</strong><span>试听曲目</span></div>
          <div><strong>30″</strong><span>官方预览</span></div>
        </div>
      </div>

      <div class="hero-record" aria-hidden="true">
        <div class="record-glow"></div>
        <div class="vinyl" :class="{ spinning: isPlaying }">
          <div class="vinyl-lines"></div>
          <img :src="currentAlbum.artwork" alt="" />
          <i></i>
        </div>
        <div class="now-caption">
          <span>NOW PLAYING</span>
          <strong>{{ currentTrack.name }}</strong>
          <small>{{ currentAlbum.title }} · 孙燕姿</small>
        </div>
      </div>
    </section>

    <section id="albums" class="album-section">
      <header class="section-heading">
        <div>
          <span class="section-index">01 / DISCOGRAPHY</span>
          <h2>沿时间，翻阅专辑</h2>
        </div>
        <p>选择一张专辑，展开它的声音切片。</p>
      </header>

      <div class="album-strip">
        <button
          v-for="album in albums"
          :key="album.id"
          class="album-card"
          :class="{ active: selectedAlbumId === album.id }"
          type="button"
          @click="selectedAlbumId = album.id"
        >
          <div class="album-art">
            <span class="album-year">{{ album.year }}</span>
            <img :src="album.artwork" :alt="`${album.title}专辑封面`" />
            <span class="album-play">▶</span>
          </div>
          <strong>{{ album.title }}</strong>
          <small>孙燕姿 · {{ album.tracks.length }} 首精选</small>
        </button>
      </div>

      <div class="track-panel">
        <div class="selected-album">
          <div class="selected-cover">
            <img
              :src="selectedAlbum.artwork"
              :alt="`${selectedAlbum.title}专辑封面`"
            />
          </div>
          <div>
            <span>{{ selectedAlbum.year }} · ALBUM</span>
            <h3>{{ selectedAlbum.title }}</h3>
            <p>{{ selectedAlbum.description }}</p>
            <button
              class="outline-button"
              type="button"
              @click="playTrack(selectedAlbum, 0)"
            >
              ▶ 从第一首播放
            </button>
          </div>
        </div>

        <div class="track-list">
          <div class="track-head">
            <span>#</span><span>歌曲</span><span>时长</span><span>试听</span>
          </div>
          <button
            v-for="(track, index) in selectedAlbum.tracks"
            :key="track.name"
            class="track-row"
            :class="{
              playing:
                currentAlbumId === selectedAlbum.id &&
                currentTrackIndex === index,
            }"
            type="button"
            @click="playTrack(selectedAlbum, index)"
          >
            <span class="track-number">
              <i
                v-if="
                  isPlaying &&
                  currentAlbumId === selectedAlbum.id &&
                  currentTrackIndex === index
                "
                class="equalizer"
              >
                <b></b><b></b><b></b>
              </i>
              <template v-else>{{
                String(index + 1).padStart(2, '0')
              }}</template>
            </span>
            <span class="track-title">
              <strong>{{ track.name }}</strong>
              <small>孙燕姿</small>
            </span>
            <span class="track-duration">{{ track.duration }}</span>
            <span class="row-play">
              {{
                isPlaying &&
                currentAlbumId === selectedAlbum.id &&
                currentTrackIndex === index
                  ? 'Ⅱ'
                  : '▶'
              }}
            </span>
          </button>
          <div class="source-note">
            本页提供 Apple Music 30 秒预览，完整歌曲请前往正版音乐平台收听。
          </div>
        </div>
      </div>
    </section>

    <section class="random-section">
      <span class="giant-quote">“</span>
      <p>有时候，下一首歌<br />比你更知道此刻的心情。</p>
      <button type="button" @click="playRandom">
        <span>⌘</span>
        随机听
        <small>从 {{ allTracks.length }} 首歌里遇见一首</small>
      </button>
    </section>

    <audio
      ref="audioRef"
      :src="currentTrack.previewUrl"
      preload="metadata"
      @ended="handleEnded"
      @pause="isPlaying = false"
      @play="isPlaying = true"
      @loadedmetadata="updateAudioState"
      @timeupdate="updateAudioState"
    ></audio>

    <footer class="player" :style="{ left: `${playerLeft}px` }">
      <div class="player-track">
        <img :src="currentAlbum.artwork" :alt="currentAlbum.title" />
        <div>
          <strong>{{ currentTrack.name }}</strong>
          <span>孙燕姿 · {{ currentAlbum.title }}</span>
        </div>
      </div>

      <div class="player-center">
        <div class="player-controls">
          <button title="随机播放" type="button" @click="playRandom">⌘</button>
          <button title="上一首" type="button" @click="playAdjacent(-1)">
            Ⅰ◀
          </button>
          <button class="main-control" type="button" @click="togglePlay">
            {{ isPlaying ? 'Ⅱ' : '▶' }}
          </button>
          <button title="下一首" type="button" @click="playAdjacent(1)">
            ▶Ⅰ
          </button>
          <a
            :href="currentTrack.appleUrl"
            target="_blank"
            title="在 Apple Music 中打开"
          >
            ↗
          </a>
        </div>
        <div class="progress-line">
          <span>{{ formatTime(currentTime) }}</span>
          <div class="range-wrap">
            <div :style="{ width: `${progress}%` }"></div>
            <input
              :max="previewDuration"
              :value="currentTime"
              min="0"
              step="0.1"
              type="range"
              @input="seek"
            />
          </div>
          <span>{{ formatTime(previewDuration) }}</span>
        </div>
      </div>

      <div class="volume" :style="{ '--volume': volume }">
        <span>{{ volume === 0 ? '×' : '◕' }}</span>
        <input
          :value="volume"
          max="1"
          min="0"
          step="0.05"
          type="range"
          @input="changeVolume"
        />
      </div>
    </footer>
  </main>
</template>

<style scoped>
:global(.vben-layout-content) {
  padding: 0 !important;
}

.music-page {
  --accent: #ffcd55;

  min-height: 100%;
  padding-bottom: 104px;
  overflow: hidden;
  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #f7f3ea;
  background:
    radial-gradient(
      circle at 80% 4%,
      color-mix(in srgb, var(--accent) 15%, transparent),
      transparent 26%
    ),
    #10100f;
  transition: --accent 0.4s ease;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

.hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(420px, 0.9fr);
  min-height: 620px;
  padding: 78px clamp(28px, 6vw, 96px) 64px;
  overflow: hidden;
}

.hero::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: '';
  background-image: linear-gradient(
    rgb(255 255 255 / 2.5%) 1px,
    transparent 1px
  );
  background-size: 100% 6px;
  opacity: 0.5;
}

.hero-copy {
  position: relative;
  z-index: 2;
  align-self: center;
  max-width: 670px;
}

.eyebrow,
.section-index {
  font-size: 11px;
  font-weight: 700;
  color: #aaa79f;
  letter-spacing: 0.24em;
}

.eyebrow {
  display: flex;
  gap: 12px;
  align-items: center;
}

.eyebrow span {
  width: 34px;
  height: 1px;
  background: var(--accent);
}

.hero h1 {
  margin: 27px 0 20px;
  font-family: Georgia, 'Songti SC', serif;
  font-size: clamp(58px, 6.7vw, 106px);
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: -0.065em;
}

.hero h1 em {
  font-weight: 400;
  color: var(--accent);
}

.hero-copy > p {
  max-width: 520px;
  font-size: 16px;
  line-height: 1.9;
  color: #aaa79f;
}

.hero-actions {
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 34px;
}

.primary-button,
.outline-button {
  font-weight: 700;
  cursor: pointer;
  border: 0;
}

.primary-button {
  display: inline-flex;
  gap: 13px;
  align-items: center;
  padding: 15px 25px;
  color: #111;
  background: var(--accent);
  border-radius: 999px;
  box-shadow: 0 12px 36px color-mix(in srgb, var(--accent) 20%, transparent);
}

.primary-button:hover {
  transform: translateY(-2px);
}

.play-symbol {
  font-size: 11px;
}

.text-button {
  font-size: 13px;
  color: #f7f3ea;
  text-decoration: none;
}

.text-button span {
  margin-left: 8px;
  color: var(--accent);
}

.hero-stats {
  display: flex;
  gap: 42px;
  margin-top: 66px;
}

.hero-stats div {
  display: grid;
  gap: 4px;
}

.hero-stats strong {
  font-family: Georgia, serif;
  font-size: 22px;
  font-weight: 400;
}

.hero-stats span {
  font-size: 11px;
  color: #77756f;
}

.hero-record {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 440px;
}

.record-glow {
  position: absolute;
  width: 440px;
  height: 440px;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0.13;
  filter: blur(110px);
}

.vinyl {
  position: relative;
  display: grid;
  place-items: center;
  width: min(33vw, 430px);
  min-width: 330px;
  height: min(33vw, 430px);
  min-height: 330px;
  overflow: hidden;
  background: repeating-radial-gradient(circle, #181817 0 3px, #242422 4px 5px);
  border: 1px solid #343431;
  border-radius: 50%;
  box-shadow: 0 30px 80px #000;
}

.vinyl::after {
  position: absolute;
  inset: 3%;
  content: '';
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 50%;
}

.vinyl.spinning {
  animation: spin 9s linear infinite;
}

.vinyl img {
  z-index: 2;
  width: 41%;
  height: 41%;
  object-fit: cover;
  border-radius: 50%;
}

.vinyl i {
  position: absolute;
  z-index: 3;
  width: 16px;
  height: 16px;
  background: #10100f;
  border: 2px solid #ccc;
  border-radius: 50%;
}

.vinyl-lines {
  position: absolute;
  inset: 9%;
  border: 1px solid rgb(255 255 255 / 9%);
  border-radius: 50%;
}

.now-caption {
  position: absolute;
  right: 2%;
  bottom: 4%;
  display: grid;
  min-width: 180px;
  padding: 16px 18px;
  background: rgb(22 22 20 / 80%);
  border: 1px solid rgb(255 255 255 / 10%);
  backdrop-filter: blur(18px);
}

.now-caption span {
  font-size: 9px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.2em;
}

.now-caption strong {
  margin-top: 7px;
  font-family: Georgia, 'Songti SC', serif;
  font-size: 19px;
}

.now-caption small {
  margin-top: 3px;
  color: #85827c;
}

.hero-orbit {
  position: absolute;
  border: 1px solid rgb(255 255 255 / 7%);
  border-radius: 50%;
}

.orbit-one {
  top: -330px;
  right: -90px;
  width: 900px;
  height: 900px;
}

.orbit-two {
  top: -190px;
  right: 50px;
  width: 620px;
  height: 620px;
}

.album-section {
  padding: 80px clamp(28px, 6vw, 96px) 92px;
  color: #1a1916;
  background: #f0ede5;
}

.section-heading {
  display: flex;
  gap: 30px;
  align-items: end;
  justify-content: space-between;
}

.section-heading h2 {
  margin: 12px 0 0;
  font-family: Georgia, 'Songti SC', serif;
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 400;
  letter-spacing: -0.05em;
}

.section-heading p {
  font-size: 13px;
  color: #817d74;
}

.album-strip {
  display: grid;
  grid-template-columns: repeat(6, minmax(130px, 1fr));
  gap: 18px;
  margin: 45px 0 52px;
}

.album-card {
  min-width: 0;
  padding: 0;
  color: inherit;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.album-art {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: #ddd8cb;
}

.album-art::after {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(180deg, rgb(0 0 0 / 4%), rgb(0 0 0 / 32%));
  opacity: 0;
  transition: opacity 0.25s ease;
}

.album-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.72);
  transition:
    transform 0.35s ease,
    filter 0.35s ease;
}

.album-year {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 3;
  padding: 4px 6px;
  font-size: 9px;
  color: #f5f0e5;
  letter-spacing: 0.1em;
  background: rgb(0 0 0 / 58%);
}

.album-play {
  position: absolute;
  right: 12px;
  bottom: 12px;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  font-size: 10px;
  color: #171713;
  background: var(--accent);
  border-radius: 50%;
  opacity: 0;
  transform: translateY(8px);
  transition: 0.25s ease;
}

.album-card:hover .album-art img,
.album-card.active .album-art img {
  filter: saturate(1);
  transform: scale(1.035);
}

.album-card:hover .album-play,
.album-card.active .album-play,
.album-card:hover .album-art::after {
  opacity: 1;
  transform: translateY(0);
}

.album-card.active .album-art {
  box-shadow:
    0 0 0 3px #f0ede5,
    0 0 0 5px #191816;
}

.album-card > strong {
  display: block;
  margin-top: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  white-space: nowrap;
}

.album-card > small {
  display: block;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  color: #8b877e;
  white-space: nowrap;
}

.track-panel {
  display: grid;
  grid-template-columns: minmax(330px, 0.8fr) 1.2fr;
  overflow: hidden;
  color: #eeeae2;
  background: #181816;
}

.selected-album {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 26px;
  align-items: center;
  padding: 38px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--accent) 14%, transparent),
    transparent 58%
  );
}

.selected-cover {
  position: relative;
}

.selected-cover::before {
  position: absolute;
  top: 9%;
  left: 34%;
  width: 91%;
  height: 91%;
  content: '';
  background: repeating-radial-gradient(circle, #111 0 2px, #282826 3px 4px);
  border-radius: 50%;
}

.selected-cover img {
  position: relative;
  z-index: 2;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  box-shadow: 0 16px 35px rgb(0 0 0 / 42%);
}

.selected-album span {
  font-size: 9px;
  font-weight: 800;
  color: var(--accent);
  letter-spacing: 0.2em;
}

.selected-album h3 {
  margin: 10px 0 8px;
  font-family: Georgia, 'Songti SC', serif;
  font-size: clamp(30px, 3.3vw, 50px);
  font-weight: 400;
}

.selected-album p {
  margin: 0 0 24px;
  font-size: 12px;
  line-height: 1.8;
  color: #8f8b84;
}

.outline-button {
  padding: 11px 16px;
  font-size: 11px;
  color: #eeeae2;
  background: transparent;
  border: 1px solid #4d4a44;
  border-radius: 999px;
}

.outline-button:hover {
  color: #171713;
  background: var(--accent);
  border-color: var(--accent);
}

.track-list {
  padding: 26px 34px 18px;
  border-left: 1px solid #2d2c29;
}

.track-head,
.track-row {
  display: grid;
  grid-template-columns: 42px 1fr 60px 42px;
  align-items: center;
}

.track-head {
  padding: 0 12px 12px;
  font-size: 9px;
  color: #65635e;
  letter-spacing: 0.12em;
  border-bottom: 1px solid #2c2b28;
}

.track-row {
  width: 100%;
  padding: 14px 12px;
  color: #ddd9d1;
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #282724;
}

.track-row:hover,
.track-row.playing {
  background: #22221f;
}

.track-row.playing .track-title strong,
.track-row.playing .row-play {
  color: var(--accent);
}

.track-number,
.track-duration {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 10px;
  color: #6d6a64;
}

.track-title {
  display: grid;
  gap: 3px;
}

.track-title strong {
  font-size: 13px;
  font-weight: 600;
}

.track-title small {
  font-size: 10px;
  color: #77746e;
}

.row-play {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  font-size: 9px;
  border: 1px solid #45423d;
  border-radius: 50%;
}

.source-note {
  padding: 15px 12px 0;
  font-size: 9px;
  color: #5f5c57;
}

.equalizer {
  display: flex;
  gap: 2px;
  align-items: end;
  width: 15px;
  height: 13px;
}

.equalizer b {
  width: 3px;
  background: var(--accent);
  animation: equalize 0.7s ease-in-out infinite alternate;
}

.equalizer b:nth-child(1) {
  height: 45%;
}

.equalizer b:nth-child(2) {
  height: 100%;
  animation-delay: -0.35s;
}

.equalizer b:nth-child(3) {
  height: 65%;
  animation-delay: -0.15s;
}

.random-section {
  position: relative;
  display: flex;
  gap: clamp(45px, 9vw, 150px);
  align-items: center;
  justify-content: center;
  min-height: 340px;
  padding: 60px 30px;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 14% 50%,
      color-mix(in srgb, var(--accent) 17%, transparent),
      transparent 30%
    ),
    #10100f;
}

.giant-quote {
  position: absolute;
  top: -95px;
  left: 7%;
  font-family: Georgia, serif;
  font-size: 370px;
  color: rgb(255 255 255 / 3.5%);
}

.random-section p {
  z-index: 2;
  margin: 0;
  font-family: Georgia, 'Songti SC', serif;
  font-size: clamp(27px, 3.4vw, 46px);
  line-height: 1.4;
}

.random-section button {
  z-index: 2;
  display: grid;
  place-content: center;
  width: 170px;
  height: 170px;
  color: #121210;
  cursor: pointer;
  background: var(--accent);
  border: 0;
  border-radius: 50%;
  transition: transform 0.25s ease;
}

.random-section button:hover {
  transform: rotate(-5deg) scale(1.04);
}

.random-section button > span {
  font-size: 24px;
}

.random-section button > small {
  display: block;
  margin-top: 7px;
  font-size: 8px;
  opacity: 0.58;
}

.player {
  position: fixed;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width, 0);
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr minmax(320px, 1.4fr) 1fr;
  align-items: center;
  min-height: 86px;
  padding: 11px clamp(18px, 3vw, 42px);
  color: #eeeae2;
  background: rgb(18 18 17 / 96%);
  border-top: 1px solid #33312e;
  backdrop-filter: blur(20px);
}

.player-track {
  display: flex;
  gap: 13px;
  align-items: center;
  min-width: 0;
}

.player-track img {
  width: 54px;
  height: 54px;
  object-fit: cover;
}

.player-track div {
  display: grid;
  min-width: 0;
}

.player-track strong,
.player-track span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-track strong {
  font-size: 13px;
}

.player-track span {
  margin-top: 4px;
  font-size: 10px;
  color: #77746e;
}

.player-center {
  display: grid;
  gap: 8px;
}

.player-controls {
  display: flex;
  gap: 19px;
  align-items: center;
  justify-content: center;
}

.player-controls button,
.player-controls a {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  padding: 0;
  font-size: 10px;
  color: #aaa69f;
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: 0;
}

.player-controls .main-control {
  width: 37px;
  height: 37px;
  color: #161512;
  background: var(--accent);
  border-radius: 50%;
}

.progress-line {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  gap: 10px;
  align-items: center;
  font-family: ui-monospace, monospace;
  font-size: 8px;
  color: #696660;
}

.range-wrap {
  position: relative;
  height: 3px;
  background: #34322e;
}

.range-wrap div {
  height: 100%;
  pointer-events: none;
  background: var(--accent);
}

.range-wrap input,
.volume input {
  position: absolute;
  inset: 50% 0 auto;
  width: 100%;
  height: 12px;
  margin: 0;
  cursor: pointer;
  opacity: 0;
  transform: translateY(-50%);
}

.volume {
  position: relative;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  justify-self: end;
  width: 120px;
  color: #77746e;
}

.volume::after {
  width: 78px;
  height: 3px;
  content: '';
  background: linear-gradient(
    90deg,
    var(--accent) calc(var(--volume, 0.75) * 100%),
    #36332f 0
  );
}

.volume input {
  left: 27px;
  width: 93px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes equalize {
  to {
    height: 20%;
  }
}

@media (max-width: 1200px) {
  .album-strip {
    grid-template-columns: repeat(6, 180px);
    overflow-x: auto;
    scrollbar-width: none;
  }

  .track-panel {
    grid-template-columns: 1fr;
  }

  .track-list {
    border-top: 1px solid #2d2c29;
    border-left: 0;
  }
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    min-height: auto;
    padding-top: 58px;
  }

  .hero-record {
    min-height: 420px;
    margin-top: 20px;
  }

  .vinyl {
    width: 360px;
    height: 360px;
  }

  .player {
    grid-template-columns: 1fr 1.2fr;
  }

  .volume {
    display: none;
  }
}

@media (max-width: 640px) {
  .music-page {
    padding-bottom: 78px;
  }

  .hero {
    padding: 46px 20px 40px;
  }

  .hero h1 {
    font-size: 57px;
  }

  .hero-stats {
    gap: 25px;
    margin-top: 45px;
  }

  .hero-record {
    min-height: 330px;
  }

  .vinyl {
    width: 290px;
    min-width: 290px;
    height: 290px;
    min-height: 290px;
  }

  .now-caption {
    right: 0;
  }

  .album-section {
    padding: 58px 20px 65px;
  }

  .section-heading {
    flex-direction: column;
    align-items: start;
  }

  .album-strip {
    grid-template-columns: repeat(6, 145px);
    margin-top: 34px;
  }

  .selected-album {
    grid-template-columns: 105px 1fr;
    padding: 26px;
  }

  .track-list {
    padding: 20px 14px 16px;
  }

  .random-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 60px 28px;
  }

  .random-section button {
    align-self: flex-end;
    width: 140px;
    height: 140px;
  }

  .player {
    left: 0;
    grid-template-columns: 1fr auto;
    min-height: 72px;
    padding: 8px 13px;
  }

  .player-track img {
    width: 45px;
    height: 45px;
  }

  .player-center {
    display: block;
  }

  .player-controls {
    gap: 6px;
  }

  .player-controls button:not(.main-control),
  .player-controls a,
  .progress-line {
    display: none;
  }
}
</style>
