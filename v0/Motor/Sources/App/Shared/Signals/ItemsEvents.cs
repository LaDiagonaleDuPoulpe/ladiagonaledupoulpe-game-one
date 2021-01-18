using Godot;
using ladiagonaledupoulpe.Sources.App.Core.Models.Items;
using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Models.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Signals
{
	/// <summary>
	/// Interact events with objects in the game
	/// This class is used in autoplayer singleton
	/// </summary>
	public class ItemsEvents : Node
	{
		#region Fields
		#region Signals
		/// <summary>
		/// Raised when one item is touched
		/// </summary>
		/// <param name="item"></param>
		[Signal]
		public delegate void ItemTouched(BaseItem item);
		#endregion
		#endregion

		#region Public methods
		/// <summary>
		/// Allows you to be attached to the event
		/// </summary>
		/// <param name="sender"></param>
		/// <param name="methodName"></param>
		public void AttachItemIsTouched(Godot.Object sender, string methodName)
		{
			this.Connect(nameof(ItemTouched), sender, methodName);
		}

		/// <summary>
		/// One item is touched, raises the signal
		/// </summary>
		/// <param name="sender"></param>
		public void BeItemIsTouched(BaseItem sender)
		{
			this.EmitSignal(nameof(ItemTouched), sender);
		}
		#endregion
	}
}
