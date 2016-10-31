/* globals define */
(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'));
    } else {
        factory(root.angular);
    }
}(this, function (angular, undefined) {
    "use strict";

    /**
     * @class MusicPlayer
     */
    function MusicPlayer() {
        var self = this;

        // Player properties
        self.enabled = true;
        self.player = new Audio();
        self.volume = 1;
        self.playlist = [];
        self.showPlaylist = false;
        self.currentTrack = null;
        self.pause = false;
        self.progress = 0;
        self.player.volume = 0.2;

        // Player Audio
        self.playTrack = function(track) {
            if (track && self.currentTrack != track) {
                self.player.setAttribute('src', track.url);
                self.player.load();
                self.currentTrack = track;
            }
            self.player.play();
            self.pause = false;
        };

        self.fastBackward = function() {
            self.player.currentTime = self.player.currentTime - (self.player.currentTime * 40) / 100;
        };

        self.fastForward = function() {
            self.player.currentTime = self.player.currentTime + (self.player.currentTime * 40) / 100;
        };

        self.hasPreviousTrack = function() {
            if (self.playlist.length) {
                var index = self.playlist.indexOf(self.currentTrack);
                return index > 0 && self.playlist[index--];
            }
        };

        self.playPreviousTrack = function() {
            if (self.playlist.length) {
                var index = self.playlist.indexOf(self.currentTrack);
                var previousTrack = self.playlist[index-1];

                if (index > 0 && previousTrack) {
                    self.playTrack(previousTrack);
                }
            }
        };

        self.pauseStopTrack = function() {
            if (self.player) {
                self.player.pause();
            }
            self.pause = true;
        };

        self.replayTrack = function() {
            self.player.currentTime = 0;
            self.playTrack();
        };

        /**
         * Remove the provided track from playlist
         * @param track
         */
        self.removeTrack = function(track) {
            var index = self.playlist.indexOf(track);
            if (self.playlist[index] === self.currentTrack) {
                self.pauseStopTrack();
            }
            self.playlist.splice(index, 1);
        };

        /**
         * Push the provided track to playlist and autoplay
         * track if it's the first one in the playlist
         * @param track
         */
        self.addTrack = function(track) {
            var wasEmpty = self.playlist.length === 0;

            if (self.playlist.indexOf(track) === -1) {
                self.playlist.push(track);
            }

            if (wasEmpty) {
                self.playTrack(self.playlist[0]);
                self.showPlaylist = true;
            }
        };

        self.hasNextTrack = function() {
            if (self.playlist.length) {
                var index = self.playlist.indexOf(self.currentTrack);
                return (index < self.playlist.length -1) && self.playlist[index++];
            }
        };

        self.playNextTrack = function() {
            if (self.playlist.length) {
                var index = self.playlist.indexOf(self.currentTrack);
                var previousTrack = self.playlist[index+1];

                if ((index < self.playlist.length) && previousTrack) {
                    self.playTrack(previousTrack);
                }
            }
        };

        self.toggleShowPlaylist = function() {
            self.showPlaylist = !self.showPlaylist;
        };

        self.setTrackProgress = function() {
            var progress = (self.player.currentTime * 100) / self.player.duration;
            self.progress = progress.toFixed(3);
        };

        self.enablePlayer = function() {
            self.enabled = true;
        };

        self.disablePlayer = function() {
            self.enabled = false;
            self.showPlaylist = false;
            self.pauseStopTrack();
        };

        self.player.addEventListener('timeupdate', function(){
            self.setTrackProgress();
            if (self.player.currentTime === self.player.duration) {
                self.playNextTrack();
            }
        });

        return self;
    }

    angular
        .module('angular-music-player', [])
        .factory('MusicPlayer', MusicPlayer);
}));
