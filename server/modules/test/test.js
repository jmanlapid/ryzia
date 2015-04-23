if (Meteor.isServer) {
  Meteor.methods({
    loadFakeData: function () {
      FakeVideos.remove({});
      FakeVideos.insert({
        title: 'video1',
        artist: 'video1',
        genres: ['rock'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video35',
        artist: 'video52',
        genres: ['rock'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video23',
        artist: 'artist23',
        genres: ['pop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video45',
        artist: 'artist45',
        genres: ['indie'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video33',
        artist: 'artist33',
        genres: ['metal'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video532',
        artist: 'artist522',
        genres: ['edm'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video31',
        artist: 'artist37',
        genres: ['r&b'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video1',
        artist: 'artist1',
        genres: ['hip hop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video653',
        artist: 'artist1',
        genres: ['psychedelic'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video1',
        artist: 'artist1',
        genres: ['country'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video1',
        artist: 'artist1',
        genres: ['hip hop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video1',
        artist: 'artist1',
        genres: ['rock', 'pop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video2',
        artist: 'artist2',
        genres: ['jazz', 'pop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video3',
        artist: 'artist3',
        genres: ['rock', 'pop', 'edm'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video4',
        artist: 'artist4',
        genres: ['hip hop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video5',
        artist: 'artist5',
        genres: ['hip hop', 'pop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video6',
        artist: 'artist6',
        genres: ['indie', 'pop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });

      FakeVideos.insert({
        title: 'video7',
        artist: 'artist7',
        genres: ['rock', 'pop'],
        status: 'APPROVED',
        keys: { 
          desktop: 'encoded/britney-sam/brinny-brinny/desktop.mp4',
          thumbnail:'encoded/britney-sam/brinny-brinny/thumb-00001.png'
        }
      });
    }
  });
}