using ladiagonaledupoulpe.Sources.App.Shared.Enums;

namespace ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.States
{
    /// <summary>
    /// State character to manage state pattern
    /// </summary>
    public interface IStateCharacter
    {
        /// <summary>
        /// Handle input of the player
        /// </summary>
        void HandleInput();

        /// <summary>
        ///  Plays animation of the current state
        /// </summary>
        void Play();

        /// <summary>
        /// Gets current direction
        /// </summary>
        Direction CurrentDirection { get; set; }
    }
}