using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using ladiagonaledupoulpe.Sources.App.Core.Models.Games;
using ladiagonaledupoulpe.Sources.App.Core.Models.Settings.Games;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Games
{
    /// <summary>
    /// Use this interface to manage the game
    /// </summary>
    public interface IGame
    {
        /// <summary>
        /// Date of the creation of the game for one player
        /// </summary>
        DateTime CreatedDate { get; }

        /// <summary>
        /// Rules of the game
        /// </summary>
        RulesSet RulesSet { get; }

        /// <summary>
        /// Current story of the game
        /// </summary>
        IStory Story { get; }

        /// <summary>
        /// Initializes the game with game settings
        /// </summary>
        /// <param name="setting"></param>
        void Initialize(GameSetting setting);

        /// <summary>
        /// Allows you to restore last check point when player is died
        /// </summary>
        void RestoreLastCheckPoint();

        /// <summary>
        /// Saves one check point to allow the player to go back when he/she dies
        /// </summary>
        void SaveNewCheckPoint();
    }
}