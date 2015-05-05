if (Meteor.isServer) {
  Meteor.methods({
    loadFakeData: function () {
      FakeVideos.remove({});
      FakeVideos.insert({
        title: 'video1',
        artist: 'video1',
        genres: ['rock'],
        status: 'APPROVED',
        youtube_id: 'nhX4rQ79C1A',
        approved_date: new Date(),
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        },
        views: {
          ryzia: 90
        }
      });

      FakeVideos.insert({
        title: 'video35',
        artist: 'video52',
        genres: ['rock'],
        status: 'APPROVED',
        youtube_id: 'TbGu4mxZDY8',
        approved_date: new Date(),
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        },
        views: {
          ryzia: 15
        }
      });

      FakeVideos.insert({
        title: 'video23',
        artist: 'artist23',
        genres: ['pop'],
        status: 'APPROVED',
        youtube_id: 'GELJIgoBwbU',
        approved_date: new Date(),
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        },
        views: {
          ryzia: 12
        }
      });

      FakeVideos.insert({
        title: 'video45',
        artist: 'artist45',
        genres: ['indie'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 3
        },
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video33',
        artist: 'artist33',
        genres: ['metal'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video532',
        artist: 'artist522',
        genres: ['edm'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video31',
        artist: 'artist37',
        genres: ['r&b'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video5432',
        artist: 'artist73423',
        genres: ['hip hop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video653',
        artist: 'artist321',
        genres: ['psychedelic'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video5215',
        artist: 'artist6376',
        genres: ['country'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video02',
        artist: 'artist213',
        genres: ['hip hop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video61',
        artist: 'artist542',
        genres: ['rock', 'pop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video84',
        artist: 'artist79',
        genres: ['jazz', 'pop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video3',
        artist: 'artist3',
        genres: ['rock', 'pop', 'edm'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video4',
        artist: 'artist4',
        genres: ['hip hop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video5',
        artist: 'artist5',
        genres: ['hip hop', 'pop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },        
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video6',
        artist: 'artist6',
        genres: ['indie', 'pop'],
        status: 'APPROVED',
        approved_date: new Date(),
        views: {
          ryzia: 1
        },
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });
      /*
      FakeVideos.insert({
        title: 'video565',
        artist: 'artist984',
        genres: ['rock', 'pop'],
        status: 'APPROVED',
        approved_date: new Date(),
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video012',
        artist: 'artist71',
        genres: ['psychedelic', 'pop'],
        status: 'APPROVED',
        approved_date: new Date(),
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });

      FakeVideos.insert({
        title: 'video73',
        artist: 'artist67',
        genres: ['psychedelic', 'rock'],
        status: 'APPROVED',
        approved_date: new Date(),
        keys: { 
          desktop: 'encoded/u2/every-breaking-wave/desktop.mp4',
          thumbnail:'encoded/u2/every-breaking-wave/thumb-00005.png'
        }
      });
  */
    }
  });
}