using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Tests
{
    public class AutoloaderPocTest : WAT.Test
    {
        #region Public methods
        [Test]
        public void TestCalling()
        {
            AutoloaderPoc poc = new AutoloaderPoc();

            this.AddChild(poc);

            Assert.IsTrue(poc != null);
            Assert.IsTrue(poc.isPassingByReady, "ispassing");
        }
        #endregion
    }
}
