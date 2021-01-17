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
	/// Represents all events about the synale
	/// This class will be singleton in autoloader
	/// </summary>
    public class SynaleEvents : Node
    {
		#region Fields
		/// <summary>
		/// Connect to this signal to get the init power point 
		/// </summary>
		[Signal]
		public delegate void SynaleInitialized(Godot.Object sender, PowerPoint point);

		/// <summary>
		/// Update the power of the synale
		/// </summary>
		/// <param name="point"></param>
		[Signal]
		public delegate void SynalePowerUpdated(Godot.Object sender, PowerPoint point);
        #endregion

        #region Public methods
		/// <summary>
		/// Launches the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="point"></param>
		public void BeInitialized(Godot.Object sender, PowerPoint point)
        {
			this.EmitSignal(nameof(SynaleInitialized), sender, point);
        }

		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachToInitialize(Godot.Object sender, string methodName)
        {
			this.Connect(nameof(SynaleInitialized), sender, methodName);
		}

		/// <summary>
		/// Launches the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="point"></param>
		public void BeUpdated(Godot.Object sender, PowerPoint point)
        {
			this.EmitSignal(nameof(SynalePowerUpdated), sender, point);
        }

		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachToUpdate(Godot.Object sender, string methodName)
		{
			this.Connect(nameof(SynalePowerUpdated), sender, methodName);
		}
		#endregion
	}
}
