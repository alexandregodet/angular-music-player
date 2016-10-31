angular
    .module('app', ['angular-music-player'])
    .controller('AppCtrl', ['$scope', 'MusicPlayer', function ($scope, MusicPlayer) {
        this.MusicPlayer = MusicPlayer;

        this.playlist = [{
            artist: "Architects",
            title: "A Match Made In Heaven",
            url: "https://p.scdn.co/mp3-preview/496eb7d4070ff7b46c6179b2239675c5397aa080"
        }, {
            artist: "Architects",
            title: "Gravedigger",
            url: "https://p.scdn.co/mp3-preview/7adc81dfe3414ddf96a4124f35a35171326e82f4"
        }].forEach(function(track) {
            MusicPlayer.addTrack(track);
        });

        MusicPlayer.player.addEventListener('timeupdate', function(){
            $scope.$apply();
        });
    }]);
