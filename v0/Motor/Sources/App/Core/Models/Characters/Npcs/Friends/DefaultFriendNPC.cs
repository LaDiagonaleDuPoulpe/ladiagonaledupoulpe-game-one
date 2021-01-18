using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ladiagonaledupoulpe.Sources.App.Shared.Signals;
using ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Npcs.Friends
{
	/// <summary>
	/// Default script to manage one npc that is not an enemy
	/// </summary>
	public class DefaultFriendNPC : BaseNPC
	{
		#region Public methods
		public override void _Ready()
		{
			base._Ready();
		}

		public override void _Process(float delta)
		{
			base._Process(delta);
		}
		#endregion

		#region Internal methods
		private void _on_ExchangeShape_body_entered(object body)
		{
			this.GetRootNode<NonPlayerCharacterEvents>().BeCharacterTouched(this);
		}
		#endregion
	}
}



