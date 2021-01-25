using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Signals
{
    /// <summary>
    /// Use this class to attach or emit events about non player characters (collision, dialog, ...)
    /// This class is used in autoplayer singleton
    /// </summary>
    public class NonPlayerCharacterEvents : Node
    {
        #region Fields
        #region Signals
        /// <summary>
        /// Raised when character is touched
        /// </summary>
        /// <param name="character"></param>
        [Signal]
        public delegate void CharacterTouched(BaseCharacter character);
        #endregion
        #endregion

        #region Public methods
        /// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
        public void AttachCharacterTouched(Godot.Object sender, string methodName)
        {
            if (! this.IsConnected(nameof(CharacterTouched), sender, methodName))
            {
                this.Connect(nameof(CharacterTouched), sender, methodName);
            }
        }

        /// <summary>
        /// tops listenning event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="methodName"></param>
        public void DetachCharacterTouched(Godot.Object sender, string methodName)
        {
            if (this.IsConnected(nameof(CharacterTouched), sender, methodName))
            {
                this.Disconnect(nameof(CharacterTouched), sender, methodName);
            }
        }

        /// <summary>
		/// One item is touched, raises the signal
		/// </summary>
		/// <param name="sender"></param>
        public void BeCharacterTouched(BaseCharacter sender)
        {
            this.EmitSignal(nameof(CharacterTouched), sender);
        }
        #endregion
    }
}
