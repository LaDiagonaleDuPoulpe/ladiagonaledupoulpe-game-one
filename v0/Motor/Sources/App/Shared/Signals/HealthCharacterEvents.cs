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
    /// Represents all main events about the health of the player
    /// This class will be singleton in autoloader
    /// </summary>
    public class HealthCharacterEvents : Node
    {
        #region Fields
        /// <summary>
        /// Initialize health value
        /// </summary>
        /// <param name="point"></param>
        [Signal]
        public delegate void HealthInitialized(Godot.Object sender, LifePoint point);

        /// <summary>
        /// Observes this event to know when health changed (plus or less)
        /// </summary>
        /// <param name="health">New health</param>
        [Signal]
        public delegate void HealthChanged(Godot.Object sender, LifePoint point);

        /// <summary>
        /// Observes this event to know when here is no life
        /// </summary>
        [Signal]
        public delegate void LifeIsGone(Godot.Object sender);

        /// <summary>
		/// Connect to this signal to know when reborn is activated and we can, for example, restore data of the player
		/// </summary>
		[Signal]
        public delegate void RebornActivated(Godot.Object sender);
        #endregion

        #region Public methods
        /// <summary>
        /// Launches the signal
        /// </summary>
        /// <param name="point"></param>
        public void BeInitialized(Godot.Object sender, LifePoint point)
        {
            this.EmitSignal(nameof(HealthInitialized), sender, point);
        }

        /// <summary>
        /// Allows you to be attached to the event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="methodName"></param>
        public void AttachToInitialize(Godot.Object sender, string methodName)
        {
            this.Connect(nameof(HealthInitialized), sender, methodName);
        }

        /// <summary>
        /// Launches the signal
        /// </summary>
        /// <param name="point"></param>
        public void BeReborn(Godot.Object sender)
        {
            this.EmitSignal(nameof(RebornActivated), sender);
        }

        /// <summary>
        /// Allows you to be attached to the reborn state
        /// </summary>
        /// <param name="sender"></param>
        public void AttachToReborn(Godot.Object sender, string methodName)
        {
            this.Connect(nameof(RebornActivated), sender, methodName);
        }

        /// <summary>
        /// Launches the signal
        /// </summary>
        /// <param name="point"></param>
        public void BeDied(Godot.Object sender)
        {
            this.EmitSignal(nameof(LifeIsGone), sender);
        }

        /// <summary>
        /// Allows you to be attached to the event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="methodName"></param>
        public void AttachToDie(Godot.Object sender, string methodName)
        {
            this.Connect(nameof(LifeIsGone), sender, methodName);
        }

        /// <summary>
        /// Launches the event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="point"></param>
        public void BeChanged(Godot.Object sender, LifePoint point)
        {
            this.EmitSignal(nameof(HealthChanged), sender, point);
        }

        /// <summary>
        /// Allows you to be attached to the event
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="methodName"></param>
        public void AttachToChange(Godot.Object sender, string methodName)
        {
            this.Connect(nameof(HealthChanged), sender, methodName);
        }
        #endregion
    }
}
