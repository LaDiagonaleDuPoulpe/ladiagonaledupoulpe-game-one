namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts.State
{
    /// <summary>
    /// State player to manage state pattern
    /// </summary>
    public interface IStatePlayer
    {
        void HandleInput();

        /// <summary>
        ///  Plays animation of the current state
        /// </summary>
        void Play();
    }
}