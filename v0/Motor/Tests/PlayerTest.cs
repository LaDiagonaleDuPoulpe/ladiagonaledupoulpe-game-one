using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WAT;

namespace ladiagonaledupoulpe.Tests
{
	class PlayerTest : WAT.Test
	{
		#region Public methods
		[Test]
		public void ValidMovingPlayer()
		{
			Player player = new Player();

			this.AddChild(player);

			Assert.IsTrue(player != null);
		}
		#endregion
	}
}
